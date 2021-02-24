APPALINCE_IP = 'initial_value'

pipeline {
    agent { label 'master' }
    parameters {
        string(name: 'AD_IP_2019', defaultValue: '10.3.69.70', description: 'Windows AD 2019 Server IP')
    }
    stages {
    stage('Deploy FireCrest') {
            steps {
              node('master') {
                deleteDir()
                git branch: 'main',
                git url: 'https://github.com/muirdok/firecrest_ui_tests'
                dir("${WORKSPACE}") {
                  sh '''
                  echo "ansible run pxe install"
                  '''                      // ansiblePlaybook(
                      //     playbook: 'ansible/deploy_fc_ad.yml',
                      //     extraVars: [
                      //                 config_vm_name: params.VM_NAME + "_" + env.BUILD_NUMBER,
                      //                 ad_ip: params.AD_IP_2019,
                      //                 ad_name: params.AD_NAME_2019
                      //                 ]
                      //                 )
                      //     script {
                      //       def FILENAME = params.VM_NAME + "_" + env.BUILD_NUMBER + ".ipv4"
                      //       APPALINCE_IP = readFile "ansible/${FILENAME}"
                      //       println(FILENAME)
                      //       println(APPALINCE_IP)
                      //           }
                    }
        }
      }
    }
    stage ('Deploy FireCrest UI') {
      steps {
        node('docker') {
          deleteDir()
          git branch: 'main',
          git url: 'https://github.com/muirdok/firecrest_ui_tests'
          dir("${WORKSPACE}") {
            sh '''
            echo "docekr run fc ui container"
            '''
              }
            }
          }
  }
    stage ('Run tests') {
      steps {
        node('docker') {
          deleteDir()
          git branch: 'main',
          git url: 'https://github.com/muirdok/firecrest_ui_tests'
          dir("${WORKSPACE}") {
            sh '''
            echo "docekr run fc ui tests"
            '''
          }
        }
      }
    }
  }
}
