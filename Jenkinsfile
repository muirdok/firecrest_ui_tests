def PowerShell(psCmd) {
    psCmd=psCmd.replaceAll("%", "%%")
    bat "powershell.exe -NonInteractive -ExecutionPolicy Bypass -Command \"\$ErrorActionPreference='Stop';[Console]::OutputEncoding=[System.Text.Encoding]::UTF8;$psCmd;EXIT \$global:LastExitCode\""
}
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
        sh '''
        echo "docker run UI"
        '''
      }
    }
    stage ('Run tests') {
      steps {
        sh '''
        echo "docker run cypress"
        '''
      }
    }
  }
}
