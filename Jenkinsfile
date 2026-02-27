pipeline {
    agent any

    environment {
        DOCKER_USER = "sairamb1902"
        BACKEND_IMAGE = "backend-app"
        FRONTEND_IMAGE = "frontend-app"
    }

    stages {

        stage('Build Backend Image') {
            steps {
                sh "docker build -t ${DOCKER_USER}/${BACKEND_IMAGE}:latest ./backend"
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh "docker build -t ${DOCKER_USER}/${FRONTEND_IMAGE}:latest ./frontend"
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh "echo ${PASS} | docker login -u ${USER} --password-stdin"
                }
            }
        }

        stage('Push Images') {
            steps {
                sh "docker push ${DOCKER_USER}/${BACKEND_IMAGE}:latest"
                sh "docker push ${DOCKER_USER}/${FRONTEND_IMAGE}:latest"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh "kubectl apply -f backend/backend-deployment.yaml"
                sh "kubectl apply -f frontend/frontend-deployment.yaml"
                sh "kubectl rollout restart deployment backend"
                sh "kubectl rollout restart deployment frontend"
            }
        }
    }
}
