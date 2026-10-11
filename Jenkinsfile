// Build the production image for www.changwei.me, ship it to production.lan and
// roll it out with docker compose.
//
// Prerequisites: Docker + BuildKit on the agent, an SSH private key credential
// with id "deploy-ssh", and a populated .env at $DEPLOY_DIR/.env on the host.
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
        DEPLOY_HOST    = 'production.lan'
        DEPLOY_DIR     = '/home/changwei/changwei-homepage'
        COMPOSE_FILE   = 'compose.yaml'
    }

    stages {
        stage('Build image') {
            steps {
                script {
                    env.GIT_SHA      = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                    env.IMAGE_TAG    = "${env.IMAGE_NAME}:${env.GIT_SHA}"
                    env.IMAGE_LATEST = "${env.IMAGE_NAME}:latest"
                    env.IMAGE_OLD    = "${env.IMAGE_NAME}:old"
                    currentBuild.displayName = "#${env.BUILD_NUMBER} (${env.GIT_SHA.take(8)})"
                    echo "Image to build: ${env.IMAGE_TAG}"
                }
                sh label: 'docker build', script: '''
                    set -euo pipefail
                    export DOCKER_BUILDKIT=1
                    docker build --pull -t "$IMAGE_TAG" .
                '''
            }
        }

        stage('Deploy') {
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

                    script {
                        def deployStatus = sh(returnStatus: true, script: '''
                            set -euo pipefail
                            SSH_OPTS="-o StrictHostKeyChecking=accept-new -o UserKnownHostsFile=$WORKSPACE/.ssh/known_hosts -o LogLevel=ERROR"
                            ssh $SSH_OPTS -i "$SSH_KEY" "$SSH_USER@$DEPLOY_HOST" bash -s -- \
                                "$IMAGE_LATEST" "$IMAGE_OLD" "$IMAGE_TAG" "$DEPLOY_DIR" "$COMPOSE_FILE" "$CONTAINER_NAME" <<'REMOTE'
set -euo pipefail

LATEST=$1
OLD=$2
NEW=$3
DEPLOY_DIR=$4
COMPOSE_FILE=$5
CONTAINER=$6

cd "$DEPLOY_DIR"

# Keep the currently deployed image available for rollback.
if docker image inspect "$LATEST" >/dev/null 2>&1; then
    docker tag "$LATEST" "$OLD"
fi

docker tag "$NEW" "$LATEST"
docker compose -f "$COMPOSE_FILE" up -d --remove-orphans

for _ in $(seq 1 60); do
    state=$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$CONTAINER" 2>/dev/null || echo missing)
    case "$state" in
        healthy) echo "Container is healthy"; exit 0 ;;
        running) echo "Container is running (no healthcheck defined)"; exit 0 ;;
        exited|dead) echo "Container entered state: $state"; exit 1 ;;
    esac
    sleep 3
done
echo "Container did not become healthy within 180s"
exit 1
REMOTE
                        ''')

                        if (deployStatus != 0) {
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

                        echo 'Deployment verified successfully.'
                        sh label: 'remove old image', script: '''
                            set -uo pipefail
                            SSH_OPTS="-o StrictHostKeyChecking=accept-new -o UserKnownHostsFile=$WORKSPACE/.ssh/known_hosts -o LogLevel=ERROR"
                            ssh $SSH_OPTS -i "$SSH_KEY" "$SSH_USER@$DEPLOY_HOST" \
                                "docker rmi '$IMAGE_OLD' || true"
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            sh 'docker rmi "$IMAGE_TAG" >/dev/null 2>&1 || true'
        }
    }
}
