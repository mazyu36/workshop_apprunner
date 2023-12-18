import * as apprunner from '@aws-cdk/aws-apprunner-alpha';

export interface apprunnerConfig {
  repositoryUrl: string,
  connectionARN: string,
}

export function createApprunnerConfig(envName: string): apprunnerConfig {
  switch (envName) {
    case 'dev':
      return {
        repositoryUrl: 'YOUR_REPOSITORY_URL',
        connectionARN: 'YOUR_CONNECTION_ARN',
      }
    default:
      throw new Error(
        `ApprunnerConfig does not exist. envName:${envName}`
      )
  }
}