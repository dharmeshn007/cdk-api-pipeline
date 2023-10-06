// #!/usr/bin/env node
// import 'source-map-support/register';
// import * as cdk from 'aws-cdk-lib';
// import { CdkApiPipelineStack } from '../lib/cdk-api-pipeline-stack';

// const app = new cdk.App();
// new CdkApiPipelineStack(app, 'CdkApiPipelineStack', {
//   /* If you don't specify 'env', this stack will be environment-agnostic.
//    * Account/Region-dependent features and context lookups will not work,
//    * but a single synthesized template can be deployed anywhere. */

//   /* Uncomment the next line to specialize this stack for the AWS Account
//    * and Region that are implied by the current CLI configuration. */
//   // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

//   /* Uncomment the next line if you know exactly what Account and Region you
//    * want to deploy the stack to. */
//   // env: { account: '123456789012', region: 'us-east-1' },

//   /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });

// #!/usr/bin/env Node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LambdaStack } from '../lib/lambda-stack';
import { PipelineStack } from '../lib/pipeline-stack';

if (!process.env.GITHUB_TOKEN) {
  console.log("No Github Token present");
}

const app = new cdk.App();
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
  env: {
    region: "eu-central-1"
  }
});
new PipelineStack(app, 'PipelineStack', {
  lambdaCode: lambdaStack.lambdaCode,
  githubToken: process.env.GITHUB_TOKEN || "",
  env: {
    region: "eu-central-1",
  }
});

app.synth();