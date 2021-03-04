APPALINCE_IP = 'initial_value'

pipeline {
    agent { label 'master' }
    parameters {
        string(name: 'fc_bn', defaultValue: '200', description: 'FireCrest build number')
        string(name: 'fc_ui_bn', defaultValue: '100', description: 'FireCrest UI build number')
        string(name: 'FC_VM', defaultValue: 'firecrest_test_ui', description: 'FireCrest VM Prefix')
        string(name: 'APPALINCE_IP', defaultValue: '192.168.1.1', description: 'FireCrest VM IP')


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
                        config_vm_name: params.FC_VM + "_" + env.BUILD_NUMBER,
                          ]
                        )
                        script {
                          def FILENAME = params.FC_VM + "_" + env.BUILD_NUMBER + ".ipv4"
                          params.APPALINCE_IP = readFile "ansible/${FILENAME}"
                          println(FILENAME)
                          println(params.APPALINCE_IP)
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
                                 sh '''
                                 echo "Go docker! Go on https://10.3.69.31:8457"
                                 docker stop firecrest-fusion || true && docker rm firecrest-fusion || true
                                 docker rmi tintri-dockerv2-local.jfrog.io/firecrest-fusion_develop:latest || true
                                 docker pull tintri-dockerv2-local.jfrog.io/firecrest-fusion_develop:latest
                                 docker run -d --name firecrest-fusion -p 8457:8457 -p 8443:8443 tintri-dockerv2-local.jfrog.io/firecrest-fusion_develop:latest
                                 '''
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
                                 sh '''
                                 printenv
                                 echo "Cypress run FireCrest UI tests against $params.APPALINCE_IP"
                                 docker run -v $PWD:/e2e -w /e2e cypress/included:6.6.0 --config baseUrl=https://10.3.69.31:8457 -e fc_applaince=$APPALINCE_IP
                                 '''
                               }
                             }
                           }
                         }
  }
}
