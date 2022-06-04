# next-todo-app

nextjs, postgresDB, prisma による TODO アプリ

# 開発環境

- docker-compose 1.29
- yarn 1.22

# 起動方法

```sh:shell
# 環境変数ファイルを準備
$ cp .env.expample .env
$ cp ./app/env.exapmple ./app/.env
# .envファイルに適宜データを入れる

# DBサーバーの起動
$ docker-compose up -d

# ローカルサーバーの起動
$ cd ./app
$ yarn dev
```

# クライアント

## apollo studio へのアクセス

ローカルサーバを起動した後、`http://localhost:3000/api/graphql`にアクセス

GraphQL のレスポンスなどを知ることができます

## 型定義ファイル作成

`app/src/query.graphql`にクエリスキーマを定義し実行。

```sh:shell
$ yarn generate
```

`app/src/generated.ts`が作成される。
grapshqL にリクエストする際は、このファイルから import したリクエストスキームを利用

# DB

## DB 初期データ挿入

```sh:shell
$ yarn prisma db seed
```

初期データは、`app/prisma/seed.ts`に記載

## prisma studio の起動

ブラウザでデータベースの確認操作ができます

```sh:shell
$ yarn prisma studio
```

`http://localhost:5555`にアクセス

# ディレクトリ構成

- `app/src/graphql`
  - GraphsQL の設定
  - GraphsQL スキーマの設定
- `app/src/prisma`
  - ORM の設定
  - DB スキーマの設定
- `app/lib`
  - クライアント設定
  - prisma と apollo のクライアントを利用する時はここから import する
- `app/src`
  - 各種ページ、コンポーネント、API エンドポイント実装
