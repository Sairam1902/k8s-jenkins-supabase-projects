pipeline {
    agent any

    environment {
        DOCKER_USER = "sairamb1902"
        BACKEND_IMAGE = "backend-app"
        FRONTEND_IMAGE = "frontend-app"
    }

    stages {

        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t $sairamb1902/$backend ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t $sairamb1902/$frontend ./frontend'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push $sairamb1902/backend'
                sh 'docker push $sairamb1902/frontend'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f backend/backend-deployment.yaml'
                sh 'kubectl apply -f frontend/frontend-deployment.yaml'
            }
        }
    }
}
