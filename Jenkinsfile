//APPALINCE_IP = 'initial_value'

pipeline {
    agent { label 'master' }

    environment {
      //RESULTS_DIR = "/tmp/fusion-test-results/${env.JOB_NAME}/${env.BUILD_NUMBER}"
      //RESULTS_LINK = "http://10.3.199.126/${env.JOB_NAME}/${env.BUILD_NUMBER}/"
      //DOCKER_92 = credentials('solutions-docker-92')
      //DOCKER_HUB = credentials('docker-hub-credentials')
      DOCKER_HOST = "10.3.69.31"
      FUSION_URL = "https://${DOCKER_HOST}:8457"
      FUSION_IMAGE = 'tintri-dockerv2-local.jfrog.io/firecrest-fusion_develop:latest'
      TOKEN = "9D4230B1-FD39-47CE-920F-024F0ED52F07"
    }

    parameters {
        string(name: 'FC_NUMBER', defaultValue: '200', description: 'FireCrest build number')
        string(name: 'FC_UI_NUMBER', defaultValue: '100', description: 'FireCrest UI build number')
        string(name: 'VM_PREFIX', defaultValue: 'firecrest_test_ui', description: 'FireCrest VM Prefix')
    }
    stages {

    stage('Deploy FireCrest') {
             steps {
               node('master') {
                 deleteDir()
                 git branch: 'main', url: 'git@github.com:muirdok/firecrest_ui_tests.git'
                 dir("${WORKSPACE}") {
                   ansiblePlaybook(
                     playbook: 'ansible/deploy_fc.yml',
                     extraVars: [
                        config_vm_name: params.VM_PREFIX + "_" + env.BUILD_NUMBER,
                          ]
                        )
                        script {
                          def FILENAME = params.VM_PREFIX + "_" + env.BUILD_NUMBER + ".ipv4"
                          def APPLIANCE_IP = readFile "ansible/${FILENAME}"
                          println(APPLIANCE_IP)
                                }
                               }
                             }
                           }
                         }

    stage('Deploy FireCrest UI') {
             steps {
               node('docker') {
                 deleteDir()
                 git branch: 'main', url: 'git@github.com:muirdok/firecrest_ui_tests.git'
                 dir("${WORKSPACE}") {
                                 sh """
                                 printenv
                                 echo "Go docker! Go on ${FUSION_URL} and ${APPLIANCE_IP}"
                                 docker stop firecrest-fusion || true && docker rm firecrest-fusion || true
                                 docker rmi ${FUSION_IMAGE} || true
                                 docker pull ${FUSION_IMAGE}
                                 docker run -d --name firecrest-fusion -p 8457:8457 -p 8443:8443 ${FUSION_IMAGE}
                                 """
                               }
                             }
                           }
                         }

    stage('Run tests') {
             steps {
               node('docker') {
                 deleteDir()
                 git branch: 'main', url: 'git@github.com:muirdok/firecrest_ui_tests.git'
                 dir("${WORKSPACE}") {
                                 sh """
                                 printenv
                                 echo Cypress run FireCrest UI tests against ${APPLIANCE_IP}
                                 docker run -i -v $PWD:/e2e -w /e2e cypress/included:6.6.0 --config baseUrl=${FUSION_URL} -e fc_applaince=${APPLIANCE_IP}
                                 """
                               }
                             }
                           }
                         }
  }
}
