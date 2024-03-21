import * as cdk from '@aws-cdk/core';
import { IacStack } from '../lib/iac-stack';

const app: cdk.Construct = new cdk.App();

const aws_account = process.env.AWS_ACCOUNT_ID;
const aws_region = process.env.AWS_DEFAULT_REGION;

new IacStack(app, 'CoilFrontendStack', {
  env: {
    account: aws_account,
    region: aws_region,
  }
});