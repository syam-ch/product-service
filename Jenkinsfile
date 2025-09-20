pipeline {
    agent any
    environment {
        AWS_DEFAULT_REGION = 'us-east-1'
        ECR_REPO = '123456789012.dkr.ecr.us-east-1.amazonaws.com'
    }
    stages {
        stage('Checkout') {
            steps { git branch: 'main', url: 'https://github.com/your-repo/microservices.git' }
        }
        stage('Docker Build & Push') {
            steps {
                script {
                    def services = ["auth-service", "user-service", "product-service"]
                    services.each { svc ->
                        sh """
                          cd microservices/${svc}
                          docker build -t $ECR_REPO/${svc}:latest .
                          aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $ECR_REPO
                          docker push $ECR_REPO/${svc}:latest
                        """
                    }
                }
            }
        }
        stage('Deploy to ECS') {
            steps {
                sh 'aws ecs update-service --cluster my-cluster --service auth-service --force-new-deployment'
                sh 'aws ecs update-service --cluster my-cluster --service user-service --force-new-deployment'
                sh 'aws ecs update-service --cluster my-cluster --service product-service --force-new-deployment'
            }
        }
    }
}
