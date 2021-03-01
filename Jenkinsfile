APPALINCE_IP = 'initial_value'

pipeline {
    agent { label 'master' }
    parameters {
        string(name: 'fc_bn', defaultValue: '200', description: 'FireCrest build number')
        string(name: 'fc_ui_bn', defaultValue: '100', description: 'FireCrest UI build number')
        string(name: 'FC_VM', defaultValue: 'firecrest_test_ui', description: 'FireCrest VM Prefix')

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
                          APPALINCE_IP = readFile "ansible/${FILENAME}"
                          println(FILENAME)
                          println(APPALINCE_IP)
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
                                 echo "Go docker! Go!"
                                 #
                                 # Clear  old containers and get new
                                 docker stop firecrest-fusion || true && docker rm firecrest-fusion || true
                                 docker rmi tintri-dockerv2-local.jfrog.io/firecrest-fusion_develop:latest
                                 docker pull tintri-dockerv2-local.jfrog.io/firecrest-fusion_develop:latest
                                 #
                                 # Run firecrest-fusion container on 10.3.69.31 docker host
                                 docker run -d --name firecrest-fusion -p 8457:8457 -p 8443:8443 \
                                 -v /opt/docker/fusion:/var/lib/nef \
                                 tintri-dockerv2-local.jfrog.io/firecrest-fusion_develop:latest
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
                                 echo "docker run FireCrest UI tests against https://10.3.69.31 e.g. https://firecrest-fusion:8457"
                                 '''
                               }
                             }
                           }
                         }
  }
}
