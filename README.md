# AWS App Runner Workshop

## 概要
[AppRunnerWorkshop](https://www.apprunnerworkshop.com)の[WORKING WITH OTHER AWS SERVICES](https://www.apprunnerworkshop.com/intermediate/)における`DEPLOYING A SIMPLE APPLICATION FROM GITHUB`（マネージドランタイム）によるデプロイをCDKで実装している。

## アーキテクチャ
![](architecture.drawio.svg)

App Runner 上 のサンプルAP（Flask）から DynamoDB に接続する構成


## ディレクトリ構成

```bash
.
├── README.md
├── ap # サンプルAP。https://github.com/andskli/repostatus-gh-demo に格納されているもの
│   ├── Dockerfile
│   ├── Pipfile
│   ├── app.py
│   ├── ddbcache.py
│   └── templates
│       ├── base.html
│       ├── index.html
│       └── repo.html
├── architecture.drawio.svg
└── cdk
    ├── README.md
    ├── bin
    │   └── cdk.ts
    ├── cdk.json
    ├── jest.config.js
    ├── lib
    │   ├── apprunner-workshop-stack.ts
    │   ├── config
    │   │   └── apprunnerConfig.ts  # App Runnerの環境依存パラメータを定義
    │   └── construct
    │       ├── apprunner.ts # App Runnerを実装
    │       └── database.ts # DynamoDBを実装
    ├── package-lock.json
    ├── package.json
    ├── test
    │   └── cdk.test.ts
    └── tsconfig.json

```

## デプロイ手順
* App Runner で Github リポジトリとの Connection を作成
* `/cdk/lib/config/apprunnerConfig.ts`において GitHub リポジトリの URL と Connection の URL を定義
* `/cdk`配下で`cdk deploy -c env=設定した環境名`でデプロイ。
