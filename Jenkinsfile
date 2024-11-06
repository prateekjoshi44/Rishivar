pipeline {
    agent { label 'HostingerSlave'}
    environment {
        CONTAINER_NAME = 'rishivar-user-react-app'
    }
    stages {
        stage('Docker') {
            steps {
                script {
                    sh """
                        docker build -t ${CONTAINER_NAME} .
                        docker-compose down
                        docker-compose up -d
                    """
                }
            }
        }
        stage('Nginx') {
            steps {
                script {
                    sh """
                        docker exec nginx nginx -t
                        docker exec nginx nginx -s reload
                    """
                }
            }
        }
    }
}
