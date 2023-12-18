#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AppRunnerWorkshopStack } from '../lib/apprunner-workshop-stack';

const app = new cdk.App();

// contextからデプロイ対象の環境を取得
const envName = app.node.tryGetContext('env');

new AppRunnerWorkshopStack(app, 'AppRunner-Workshop-Stack', {
  env: {
    region: 'ap-northeast-1'
  },
  stackName: `${envName}-AppRunner-Workshop`,
  envName: envName,
  terminationProtection: false,
})