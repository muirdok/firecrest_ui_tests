APPALINCE_IP = 'initial_value'

pipeline {
    agent { label 'master' }
    parameters {
        string(name: 'AD_IP_2019', defaultValue: '10.3.69.70', description: 'Windows AD 2019 Server IP')
    }
    stages {
    // stage('Deploy FireCrest') {
    //         steps {
    //           node('master') {
    //             deleteDir()
    //             git branch: 'main',
    //             git url: 'https://github.com/muirdok/firecrest_ui_tests'
    //             dir("${WORKSPACE}") {
    //               sh '''
    //               echo "ansible run pxe install"
    //               '''                      // ansiblePlaybook(
    //                   //     playbook: 'ansible/deploy_fc_ad.yml',
    //                   //     extraVars: [
    //                   //                 config_vm_name: params.VM_NAME + "_" + env.BUILD_NUMBER,
    //                   //                 ad_ip: params.AD_IP_2019,
    //                   //                 ad_name: params.AD_NAME_2019
    //                   //                 ]
    //                   //                 )
    //                   //     script {
    //                   //       def FILENAME = params.VM_NAME + "_" + env.BUILD_NUMBER + ".ipv4"
    //                   //       APPALINCE_IP = readFile "ansible/${FILENAME}"
    //                   //       println(FILENAME)
    //                   //       println(APPALINCE_IP)
    //                   //           }
    //                 }
    //     }
    //   }
    // }
    stage('Deploy appliance join 2019 AD run CRUD tests against w2016 and w10 clients') {
             steps {
               node('master') {
                 deleteDir()
                 git url: 'git@github.com:muirdok/firecrest_ui_tests.git'
                 dir("${WORKSPACE}") {
                                 sh '''
                                 echo "ansible run pxe install"
                                 '''
                               }
      }
    }
  }
}
