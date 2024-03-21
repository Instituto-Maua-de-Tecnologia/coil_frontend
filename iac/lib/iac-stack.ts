import * as cdk from '@aws-cdk/core';
import * as amplify from '@aws-cdk/aws-amplify';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';

export class IacStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ENVIROMENT_VARIABLES = {
      "OWNER": process.env.OWNER || "",
      "STAGE": process.env.STAGE || "dev",
      "AZURE_CLIENT_ID": process.env.AZURE_CLIENT_ID || "",
    }

    const amplifyApp = new amplify.App(this, 'coil_froentend', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: ENVIROMENT_VARIABLES.OWNER,
        repository: 'coil-frontend',
        oauthToken: cdk.SecretValue.secretsManager('coil-github-token',
        { 
          jsonField: 'coil-github-token' 
        }),
      }),
      environmentVariables: ENVIROMENT_VARIABLES,
    });

    const prodBranch = amplifyApp.addBranch('prod');
    const devBranch = amplifyApp.addBranch('dev');
  }
}
