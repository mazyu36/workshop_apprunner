import { Construct } from 'constructs';
import * as apprunner from '@aws-cdk/aws-apprunner-alpha';
import * as cdk from 'aws-cdk-lib';
import { aws_iam as iam } from 'aws-cdk-lib';

import { CfnService } from "aws-cdk-lib/aws-apprunner";
import { createApprunnerConfig } from '../config/apprunnerConfig';

export interface AppRunnerConstructProps {
  envName: string,
  tableArn: string,
}

export class AppRunnerConstruct extends Construct {
  constructor(scope: Construct, id: string, props: AppRunnerConstructProps) {
    super(scope, id);

    // configを取得
    const config = createApprunnerConfig(props.envName);

    // App Runner Serviceを作成
    const appRunnerService = new apprunner.Service(this, 'AppRunnerService', {
      source: apprunner.Source.fromGitHub({
        repositoryUrl: config.repositoryUrl, // 環境依存パラメータとして外だし
        branch: 'main',
        configurationSource: apprunner.ConfigurationSourceType.API,
        codeConfigurationValues: {
          runtime: apprunner.Runtime.PYTHON_3,
          buildCommand: 'pip install pipenv && pipenv install',
          startCommand: 'pipenv run flask run -h 0.0.0.0 -p 8080',
          port: '8080',
        },
        connection: apprunner.GitHubConnection.fromConnectionArn(config.connectionARN) // 環境依存パラメータとして外だし
      })
    })

    // EscapeHatchesでモノレポの設定
    const appRunnerCfnService = appRunnerService.node.defaultChild as CfnService;

    appRunnerCfnService.addPropertyOverride('SourceConfiguration.CodeRepository.SourceDirectory', '/ap')

    // DynamoDBへのアクセス権限を付与
    appRunnerService.addToRolePolicy(
      new iam.PolicyStatement({
        actions: [
          'dynamodb:GetItem',
          'dynamodb:BatchGetItem',
          'dynamodb:Scan',
          'dynamodb:Query',
          'dynamodb:ConditionCheckItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:BatchWriteItem',
          'dynamodb:DeleteItem',
        ],
        resources: [props.tableArn],
      })
    )

    // App RunnerのURLを出力
    new cdk.CfnOutput(this, 'AppRunnerServiceUrl', {
      exportName: 'AppRunnerServiceUrl',
      value: appRunnerService.serviceUrl,
    })
  }
}