import * as cdk from '@aws-cdk/core';
import * as amplify from '@aws-cdk/aws-amplify';

export class IacStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ENVIROMENT_VARIABLES = {
      "OWNER": process.env.OWNER || "",
      "STAGE": process.env.STAGE || "dev",
      "AZURE_CLIENT_ID": process.env.AZURE_CLIENT_ID || "",
      "AZURE_AUTHORITY_URL": process.env.AZURE_AUTHORITY_URL || "",
    }

    const amplifyApp = new amplify.App(this, 'coil_froentend', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: ENVIROMENT_VARIABLES.OWNER,
        repository: 'coil-frontend',
        oauthToken: cdk.SecretValue.secretsManager('github-token', {
          jsonField: 'github-token',
        }),
      }),
      environmentVariables: ENVIROMENT_VARIABLES,
    });

    const prodBranch = amplifyApp.addBranch('prod');
    const devBranch = amplifyApp.addBranch('dev');
  }
}
