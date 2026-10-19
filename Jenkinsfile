#!/usr/bin/env groovy

pipeline {
    agent {
        docker {
            image 'cimg/node:26'
            args '''
                -u root:root
                -v /var/run/docker.sock:/var/run/docker.sock
                -v changwei-homepage-pnpm-store:/root/.local/share/pnpm/store
            '''
            reuseNode true
        }
    }

    options {
        ansiColor('xterm')
        timestamps()
        timeout(time: 60, unit: 'MINUTES')
        disableConcurrentBuilds(abortPrevious: true)
        skipDefaultCheckout(true)
    }

    environment {
        IMAGE_NAME = 'changwei-homepage-nextjs'
        CONTAINER_NAME = 'changwei-homepage-nextjs'
        DEPLOY_USER = 'changwei'
        DEPLOY_HOST = 'production.lan'
        DEPLOY_DIR = 'changwei-homepage'
        DOCKER_BUILDKIT = '1'
        BUILDX_NO_DEFAULT_ATTESTATIONS = '1'
    }

    stages {
        stage('Prepare Agent') {
            steps {
                sh '''
                    set -eu

                    if ! command -v docker >/dev/null 2>&1; then
                        apt-get update
                        DEBIAN_FRONTEND=noninteractive apt-get install -y \
                            docker.io \
                            openssh-client \
                            gzip
                        rm -rf /var/lib/apt/lists/*
                    fi

                    docker --version
                    docker info >/dev/null
                    node --version
                    npm --version
                '''
            }
        }

        stage('Checkout') {
            steps {
                sh '''
                    set -eu

                    WORKSPACE_PARENT="$(dirname "${WORKSPACE}")"
                    WORKSPACE_UID="$(stat -c '%u' "${WORKSPACE_PARENT}")"
                    WORKSPACE_GID="$(stat -c '%g' "${WORKSPACE_PARENT}")"

                    if [ -d "${WORKSPACE}" ]; then
                        chown -R "${WORKSPACE_UID}:${WORKSPACE_GID}" "${WORKSPACE}"
                    fi

                    git config --global --add safe.directory "${WORKSPACE}"
                '''

                checkout scm

                script {
                    env.IMAGE_TAG = sh(
                        script: 'git rev-parse HEAD',
                        returnStdout: true
                    ).trim()
                }

                sh '''
                    set -eu
                    git config --global --add safe.directory "${WORKSPACE}"
                    echo "Git commit: ${IMAGE_TAG}"
                '''

                echo "Image: ${env.IMAGE_NAME}:${env.IMAGE_TAG}"
            }
        }

        stage('Setup pnpm') {
            steps {
                sh '''
                    set -eu

                    test -f package.json
                    test -f pnpm-lock.yaml

                    PACKAGE_MANAGER="$(node -p "require('./package.json').packageManager || ''")"

                    if ! printf '%s' "${PACKAGE_MANAGER}" | grep -q '^pnpm@'; then
                        echo "ERROR: package.json must define packageManager as pnpm@<version>."
                        exit 1
                    fi

                    PACKAGE_MANAGER="${PACKAGE_MANAGER%%+*}"

                    npm install --global "${PACKAGE_MANAGER}"

                    echo "Node.js: $(node --version)"
                    echo "pnpm: $(pnpm --version)"
                    echo "pnpm store: $(pnpm store path)"
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    set -eu

                    pnpm install --frozen-lockfile --prefer-offline

                    echo "Dependencies installed successfully."
                '''
            }
        }

        stage('Type Check') {
            steps {
                sh '''
                    set -eu

                    pnpm run typecheck

                    echo "Type check passed."
                '''
            }
        }

        stage('Lint') {
            steps {
                sh '''
                    set -eu

                    pnpm run lint

                    echo "Lint passed."
                '''
            }
        }

        stage('Prepare Deployment Files') {
            steps {
                withCredentials([
                    file(
                        credentialsId: 'changwei-homepage-dotenv',
                        variable: 'ENV_FILE'
                    )
                ]) {
                    sh '''
                        set -eu
                        umask 077

                        cp "${ENV_FILE}" .env
                        chmod 600 .env

                        test -s .env
                        test -f Dockerfile
                        test -f compose.yaml

                        echo "Deployment files prepared."
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    set -eu

                    test -f Dockerfile
                    test -s .env

                    CACHE_ARGS=""

                    if docker image inspect "${IMAGE_NAME}:buildcache" >/dev/null 2>&1; then
                        echo "Docker build cache found."
                        CACHE_ARGS="--cache-from=${IMAGE_NAME}:buildcache"
                    else
                        echo "No Docker build cache found."
                    fi

                    docker build \
                        --progress=plain \
                        --secret id=app_env,src=.env \
                        --build-arg BUILDKIT_INLINE_CACHE=1 \
                        ${CACHE_ARGS} \
                        --tag "${IMAGE_NAME}:${IMAGE_TAG}" \
                        --tag "${IMAGE_NAME}:buildcache" \
                        .

                    docker image inspect "${IMAGE_NAME}:${IMAGE_TAG}" \
                        --format 'Image ID: {{.Id}}'

                    docker image inspect "${IMAGE_NAME}:${IMAGE_TAG}" \
                        --format 'Image size: {{.Size}} bytes'

                    echo "Docker image built successfully."
                '''
            }
        }

        stage('Transfer Image and Configuration') {
            steps {
                sshagent(credentials: ['deploy-ssh']) {
                    sh '''
                        set -eu

                        SSH_OPTS="-o StrictHostKeyChecking=no"
                        DEPLOY_TARGET="${DEPLOY_USER}@${DEPLOY_HOST}"

                        echo "Testing SSH connection..."

                        ssh ${SSH_OPTS} \
                            "${DEPLOY_TARGET}" \
                            'echo "SSH authentication successful."'

                        echo "Preparing remote deployment directory..."

                        ssh ${SSH_OPTS} \
                            "${DEPLOY_TARGET}" \
                            "mkdir -p /home/${DEPLOY_USER}/${DEPLOY_DIR}"

                        echo "Transferring Docker image..."

                        docker save "${IMAGE_NAME}:${IMAGE_TAG}" \
                            | gzip -1 \
                            | ssh ${SSH_OPTS} \
                                "${DEPLOY_TARGET}" \
                                "gunzip | docker load"

                        echo "Transferring environment configuration..."

                        scp ${SSH_OPTS} \
                            .env \
                            "${DEPLOY_TARGET}:/home/${DEPLOY_USER}/${DEPLOY_DIR}/.env"

                        echo "Transferring Compose configuration..."

                        scp ${SSH_OPTS} \
                            compose.yaml \
                            "${DEPLOY_TARGET}:/home/${DEPLOY_USER}/${DEPLOY_DIR}/compose.yaml"

                        echo "Image and configuration transferred successfully."
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent(credentials: ['deploy-ssh']) {
                    sh '''
                        set -eu

                        SSH_OPTS="-o StrictHostKeyChecking=no"
                        DEPLOY_TARGET="${DEPLOY_USER}@${DEPLOY_HOST}"
                        IMAGE_REF="${IMAGE_NAME}:${IMAGE_TAG}"

                        echo "Deploying ${IMAGE_REF}..."

                        ssh ${SSH_OPTS} \
                            "${DEPLOY_TARGET}" \
                            "bash -s -- '${IMAGE_NAME}' '${IMAGE_TAG}' '${DEPLOY_DIR}' '${CONTAINER_NAME}' '${DEPLOY_USER}'" <<'REMOTE_SCRIPT'
                        set -eu

                        IMAGE_NAME="$1"
                        IMAGE_TAG="$2"
                        DEPLOY_DIR="$3"
                        CONTAINER_NAME="$4"
                        DEPLOY_USER="$5"
                        IMAGE_REF="${IMAGE_NAME}:${IMAGE_TAG}"
                        export IMAGE_NAME IMAGE_TAG CONTAINER_NAME
                        APP_DIR="/home/${DEPLOY_USER}/${DEPLOY_DIR}"
                        COMPOSE_FILE="${APP_DIR}/compose.yaml"
                        PREVIOUS_IMAGE=""

                        cd "${APP_DIR}"

                        if docker inspect "${CONTAINER_NAME}" >/dev/null 2>&1; then
                            PREVIOUS_IMAGE="$(docker inspect \
                                --format '{{.Config.Image}}' \
                                "${CONTAINER_NAME}")"
                        fi

                        echo "Previous image: ${PREVIOUS_IMAGE:-<none>}"
                        echo "Candidate image: ${IMAGE_REF}"

                        rollback() {
                            DEPLOY_STATUS=$?
                            trap - EXIT

                            if [ "${DEPLOY_STATUS}" -eq 0 ]; then
                                return
                            fi

                            echo "Deployment or health verification failed. Rolling back..." >&2
                            docker compose -f "${COMPOSE_FILE}" logs --tail=100 >&2 || true

                            if [ -n "${PREVIOUS_IMAGE}" ] && \
                               [ "${PREVIOUS_IMAGE%:*}" = "${IMAGE_NAME}" ] && \
                               docker image inspect "${PREVIOUS_IMAGE}" >/dev/null 2>&1; then
                                PREVIOUS_TAG="${PREVIOUS_IMAGE##*:}"
                                if IMAGE_NAME="${IMAGE_NAME}" \
                                    CONTAINER_NAME="${CONTAINER_NAME}" \
                                    IMAGE_TAG="${PREVIOUS_TAG}" docker compose \
                                    -f "${COMPOSE_FILE}" up -d --wait --wait-timeout 120; then
                                    echo "Previous image restored: ${PREVIOUS_IMAGE}" >&2
                                else
                                    echo "ERROR: rollback failed for ${PREVIOUS_IMAGE}." >&2
                                    docker compose -f "${COMPOSE_FILE}" ps >&2 || true
                                    docker compose -f "${COMPOSE_FILE}" logs --tail=100 >&2 || true
                                fi
                            else
                                echo "No previous image is available; stopping the failed first deployment." >&2
                                docker compose -f "${COMPOSE_FILE}" down || true
                            fi

                            exit "${DEPLOY_STATUS}"
                        }

                        trap rollback EXIT

                        docker image inspect "${IMAGE_REF}" >/dev/null
                        IMAGE_NAME="${IMAGE_NAME}" \
                            CONTAINER_NAME="${CONTAINER_NAME}" \
                            IMAGE_TAG="${IMAGE_TAG}" \
                            docker compose -f "${COMPOSE_FILE}" config --quiet

                        IMAGE_NAME="${IMAGE_NAME}" \
                            CONTAINER_NAME="${CONTAINER_NAME}" \
                            IMAGE_TAG="${IMAGE_TAG}" \
                            docker compose \
                            -f "${COMPOSE_FILE}" \
                            up -d \
                            --remove-orphans \
                            --wait \
                            --wait-timeout 120

                        echo "Checking expected image and running state..."
                        RUNNING_IMAGE="$(docker inspect \
                            --format '{{.Config.Image}}' \
                            "${CONTAINER_NAME}")"
                        RUNNING_STATE="$(docker inspect \
                            --format '{{.State.Status}}' \
                            "${CONTAINER_NAME}")"
                        HEALTH_STATUS="$(docker inspect \
                            --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}missing{{end}}' \
                            "${CONTAINER_NAME}")"

                        test "${RUNNING_IMAGE}" = "${IMAGE_REF}"
                        test "${RUNNING_STATE}" = "running"
                        test "${HEALTH_STATUS}" = "healthy"

                        echo "Checking HTTP response from the published application port..."
                        docker exec "${CONTAINER_NAME}" node -e '
                            const http = require("node:http");
                            const request = http.get("http://127.0.0.1:1997/", response => {
                                response.resume();
                                process.exit(response.statusCode >= 200 && response.statusCode < 400 ? 0 : 1);
                            });
                            request.setTimeout(10000, () => request.destroy(new Error("HTTP probe timed out")));
                            request.on("error", error => {
                                console.error(error.message);
                                process.exit(1);
                            });
                        '

                        echo "Deployment and health checks passed."
                        trap - EXIT
REMOTE_SCRIPT

                        echo "Deployment completed and verified."
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully.'
        }

        failure {
            echo 'Deployment failed. Review the failed stage logs.'
        }

        always {
            sh '''
                set +e
                rm -f .env
            '''

            cleanWs(
                deleteDirs: true,
                disableDeferredWipeout: true,
                notFailBuild: true
            )
        }
    }
}
