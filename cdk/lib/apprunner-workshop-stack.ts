import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DatabaseConstruct } from './construct/database';
import { AppRunnerConstruct } from './construct/apprunner';

interface AppRunnerWorkshopStackProps extends cdk.StackProps {
  envName: string

}

export class AppRunnerWorkshopStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AppRunnerWorkshopStackProps) {
    super(scope, id, props);

    const database = new DatabaseConstruct(this, 'DatabaseConstruct', {})

    new AppRunnerConstruct(this, 'AppRunnerConstruct', {
      envName: props.envName,
      tableArn: database.dynamoDbTable.tableArn
    })

  }
}
