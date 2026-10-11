// Jenkins declarative pipeline for www.changwei.me
//
// Flow:
//   1. Build the production image on the Jenkins agent, tagged with the full
//      Git commit hash:  changwei-homepage-nextjs:<full-sha>
//   2. Ship the image (and compose.yaml) to production.lan over SSH.
//   3a. On the host, keep the currently running image as :old.
//   3b. Promote the new image to :latest and (re)start the service with
//       docker compose.
//   4. If the new container becomes healthy, remove the :old image.
//      Otherwise retag :old back to :latest, restart, and fail the build.
//
// Prerequisites:
//   - Jenkins agent with Docker + BuildKit enabled (the Dockerfile uses
//     "RUN --mount=type=cache", so classic builder is not enough).
//   - An SSH "Username with private key" credential with id "deploy-ssh"
//     that can log into production.lan.
//   - "docker compose" (Compose v2) available on production.lan.
//   - A populated .env sitting at $DEPLOY_DIR/.env on production.lan; the
//     pipeline syncs compose.yaml but never ships secrets.

pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    environment {
        IMAGE_NAME     = 'changwei-homepage-nextjs'
        CONTAINER_NAME = 'changwei-homepage-nextjs'
        // Container name used by the pre-Jenkins (GitHub Actions) setup. It is
        // removed before the first deploy so it cannot keep holding port 1997.
        // Leave empty once the migration is done.
        LEGACY_CONTAINER_NAME = 'changwei-homepage'
        DEPLOY_HOST    = 'production.lan'
        DEPLOY_DIR     = '/home/changwei/changwei-homepage'
        // Compose file shipped by this pipeline and used on the host.
        COMPOSE_FILE   = 'compose.yaml'
        // Seconds to wait for the freshly started container to become healthy.
        HEALTH_TIMEOUT = '180'
    }

    stages {
        stage('Prepare') {
            steps {
                script {
                    env.GIT_SHA = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                    env.IMAGE_TAG    = "${env.IMAGE_NAME}:${env.GIT_SHA}"
                    env.IMAGE_LATEST = "${env.IMAGE_NAME}:latest"
                    env.IMAGE_OLD    = "${env.IMAGE_NAME}:old"
                    currentBuild.displayName = "#${env.BUILD_NUMBER} (${env.GIT_SHA.take(8)})"
                    echo "Image to build: ${env.IMAGE_TAG}"
                }
            }
        }

        stage('Build image') {
            steps {
                sh label: 'docker build', script: '''
                    set -euo pipefail
                    export DOCKER_BUILDKIT=1
                    docker build --pull -t "$IMAGE_TAG" .
                '''
            }
        }

        stage('Transfer to production') {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'deploy-ssh',
                    keyFileVariable: 'SSH_KEY',
                    usernameVariable: 'SSH_USER'
                )]) {
                    sh label: 'sync compose file and load image', script: '''
                        set -euo pipefail
                        SSH_OPTS="-o StrictHostKeyChecking=accept-new -o UserKnownHostsFile=$WORKSPACE/.ssh/known_hosts -o LogLevel=ERROR"
                        mkdir -p "$WORKSPACE/.ssh"

                        ssh $SSH_OPTS -i "$SSH_KEY" "$SSH_USER@$DEPLOY_HOST" "mkdir -p '$DEPLOY_DIR'"
                        ssh $SSH_OPTS -i "$SSH_KEY" "$SSH_USER@$DEPLOY_HOST" "cat > '$DEPLOY_DIR/$COMPOSE_FILE'" < "$COMPOSE_FILE"

                        docker save "$IMAGE_TAG" | gzip -1 | \
                            ssh $SSH_OPTS -i "$SSH_KEY" "$SSH_USER@$DEPLOY_HOST" "gunzip | docker load"
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'deploy-ssh',
                    keyFileVariable: 'SSH_KEY',
                    usernameVariable: 'SSH_USER'
                )]) {
                    script {
                        // Promote the new image and roll back the tag on failure.
                        def deployStatus = sh(returnStatus: true, script: '''
                            set -euo pipefail
                            SSH_OPTS="-o StrictHostKeyChecking=accept-new -o UserKnownHostsFile=$WORKSPACE/.ssh/known_hosts -o LogLevel=ERROR"
                            ssh $SSH_OPTS -i "$SSH_KEY" "$SSH_USER@$DEPLOY_HOST" bash -s -- \
                                "$IMAGE_LATEST" "$IMAGE_OLD" "$IMAGE_TAG" "$DEPLOY_DIR" "$COMPOSE_FILE" "$CONTAINER_NAME" "$LEGACY_CONTAINER_NAME" "$HEALTH_TIMEOUT" <<'REMOTE'
set -euo pipefail

LATEST=$1
OLD=$2
NEW=$3
DEPLOY_DIR=$4
COMPOSE_FILE=$5
CONTAINER=$6
LEGACY_CONTAINER=$7
TIMEOUT=$8

cd "$DEPLOY_DIR"

# 1. Preserve the currently deployed image under the :old tag.
if docker image inspect "$LATEST" >/dev/null 2>&1; then
    docker tag "$LATEST" "$OLD"
    echo "Current image preserved as $OLD"
else
    echo "No existing $LATEST image; nothing to preserve"
fi

# 2. Remove any container left over from the pre-Jenkins setup. It is not part
#    of this Compose project, so --remove-orphans would not touch it, and it may
#    still be holding the published port.
if [ -n "$LEGACY_CONTAINER" ] && [ "$LEGACY_CONTAINER" != "$CONTAINER" ]; then
    if docker rm -f "$LEGACY_CONTAINER" >/dev/null 2>&1; then
        echo "Removed legacy container $LEGACY_CONTAINER"
    fi
fi

# 3. Promote the freshly transferred image to :latest.
docker tag "$NEW" "$LATEST"
echo "Promoted $NEW -> $LATEST"

# 4. (Re)create the service. Use -f explicitly so a stray compose file in the
#    deploy directory cannot be picked up by Compose's default file lookup.
docker compose -f "$COMPOSE_FILE" up -d --remove-orphans

# 5. Wait for the container to report healthy.
deadline=$((SECONDS + TIMEOUT))
while [ "$SECONDS" -lt "$deadline" ]; do
    state=$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$CONTAINER" 2>/dev/null || echo missing)
    case "$state" in
        healthy) echo "Container is healthy"; exit 0 ;;
        running) echo "Container is running (no healthcheck defined)"; exit 0 ;;
        exited|dead) echo "Container entered state: $state"; exit 1 ;;
        *) echo "Waiting for container ($state)..."; sleep 3 ;;
    esac
done
echo "Container did not become healthy within ${TIMEOUT}s"
exit 1
REMOTE
                        ''')

                        if (deployStatus == 0) {
                            echo 'Deployment verified successfully.'
                        } else {
                            echo "Deployment verification failed (exit ${deployStatus}); rolling back."
                            def rollbackStatus = sh(returnStatus: true, script: '''
                            set -euo pipefail
                            SSH_OPTS="-o StrictHostKeyChecking=accept-new -o UserKnownHostsFile=$WORKSPACE/.ssh/known_hosts -o LogLevel=ERROR"
                            ssh $SSH_OPTS -i "$SSH_KEY" "$SSH_USER@$DEPLOY_HOST" bash -s -- \
                                "$IMAGE_LATEST" "$IMAGE_OLD" "$DEPLOY_DIR" "$COMPOSE_FILE" <<'REMOTE'
set -euo pipefail

LATEST=$1
OLD=$2
DEPLOY_DIR=$3
COMPOSE_FILE=$4

cd "$DEPLOY_DIR"

# Restore the previous image under :latest and restart.
if docker image inspect "$OLD" >/dev/null 2>&1; then
    docker tag "$OLD" "$LATEST"
    docker compose -f "$COMPOSE_FILE" up -d --remove-orphans
    echo "Rolled back $LATEST to the previous image"
else
    echo "No previous image to roll back to; stopping the service"
    docker compose -f "$COMPOSE_FILE" down --remove-orphans || true
fi
REMOTE
                        ''')

                            if (rollbackStatus == 0) {
                                error('Deployment failed; rolled back to the previous image.')
                            } else {
                                error('Deployment failed AND rollback failed; manual intervention required.')
                            }
                        }
                    }
                }
            }
        }

        stage('Remove old image') {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'deploy-ssh',
                    keyFileVariable: 'SSH_KEY',
                    usernameVariable: 'SSH_USER'
                )]) {
                    sh label: 'docker rmi old', script: '''
                        set -uo pipefail
                        SSH_OPTS="-o StrictHostKeyChecking=accept-new -o UserKnownHostsFile=$WORKSPACE/.ssh/known_hosts -o LogLevel=ERROR"
                        ssh $SSH_OPTS -i "$SSH_KEY" "$SSH_USER@$DEPLOY_HOST" \
                            "docker rmi '$IMAGE_OLD' && echo 'Removed $IMAGE_OLD' || echo 'No old image to remove'"
                    '''
                }
            }
        }
    }

    post {
        always {
            // Drop the locally built image to keep the agent tidy; BuildKit layer
            // cache is stored separately and is unaffected.
            sh label: 'cleanup local image', script: '''
                docker rmi "$IMAGE_TAG" >/dev/null 2>&1 || true
            '''
        }
    }
}
