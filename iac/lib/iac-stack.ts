import * as path from 'path';
import * as cdk from '@aws-cdk/core';
import { Asset } from '@aws-cdk/aws-s3-assets';
import * as amplify from '@aws-cdk/aws-amplify';
import * as codecommit from '@aws-cdk/aws-codecommit'

export class IacStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ENVIROMENT_VARIABLES = {
      "OWNER": process.env.OWNER || "",
      "STAGE": process.env.STAGE || "dev",
      "AZURE_CLIENT_ID": process.env.AZURE_CLIENT_ID || "",
    }

    const coilAsset = new Asset(this, 'CoilFrontendAsset', {
      path: path.join(__dirname, '..', '..', '**/*')
    });

    console.log('path' + path.join(__dirname, '..', '..', '**/*'))

    const sampleRepo = new codecommit.Repository(
      this,
      "CoilFrontendRepo",
      {
        repositoryName: "coil-frontend-repo-" + ENVIROMENT_VARIABLES.STAGE,
        description:
          "Repository for the frontend of the Coil project",
        code: codecommit.Code.fromAsset(coilAsset),
      },
    )

    const amplifyApp = new amplify.App(this, 'coil_froentend', {
      sourceCodeProvider: new amplify.CodeCommitSourceCodeProvider({
        repository: sampleRepo,

      }),
      environmentVariables: ENVIROMENT_VARIABLES
    });

    const branch = amplifyApp.addBranch(ENVIROMENT_VARIABLES.STAGE);
  }
}
