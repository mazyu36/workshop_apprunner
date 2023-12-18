import { Construct } from 'constructs';
import { aws_dynamodb as dynamodb } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';

export interface DatabaseConstructProps {

}

export class DatabaseConstruct extends Construct {
  public readonly dynamoDbTable: dynamodb.Table
  constructor(scope: Construct, id: string, props: DatabaseConstructProps) {
    super(scope, id);

    // DynamoDBのテーブルを作成
    const dynamoDbTable = new dynamodb.Table(this, 'DynamoDB', {
      tableName: 'repostatus_cache',
      partitionKey: {
        name: 'repoSlug',
        type: dynamodb.AttributeType.STRING
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: 'ttl',
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    this.dynamoDbTable = dynamoDbTable;


  }
}