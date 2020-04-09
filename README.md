## このリポジトリについて

[Create React App](https://github.com/facebook/create-react-app) をベースに、Firestore を利用するサンプルアプリです

## 初期設定

1. Web 上で Firebase のプロジェクトを設定します
2. 以下コマンドでサンプルのファイルをベースに環境変数を設定するためのファイルを作成します。
3. 上記の 1.で作成した Firebase のプロジェクトの必要な情報を.env.development.local に記載していきます

```sh
cp .env.sample .env.development.local
```

## 開発環境の事項

以下コマンドを実行することで .env.development.local のファイルを読み込みつつ開発環境のためのサーバーが起動します。

```sh
npm run dev
```
