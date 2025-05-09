# Fukui Platform Internship Projects

## 概要
このプロジェクトは福井プラットフォームのインターンシップ用の開発環境です。

## プロジェクト構成
- フロントエンド: React.js
- バックエンド: Node.js
- データベース: PostgreSQL

## セットアップ手順

### 必要条件
- Node.js (v18以上)
- PostgreSQL (v14以上)
- Git

### インストール手順
1. リポジトリのクローン
```bash
git clone https://github.com/your-username/_internship_fukui_platform.git
cd _internship_fukui_platform
```

2. 依存関係のインストール
```bash
# フロントエンド
cd frontend
npm install

# バックエンド
cd ../backend
npm install
```

3. 環境変数の設定
```bash
# .envファイルを作成し、必要な環境変数を設定
cp .env.example .env
```

4. データベースのセットアップ
```bash
# PostgreSQLにデータベースを作成
createdb fukui_platform

# マイグレーションの実行
cd backend
npm run migrate
```

## 使用方法

### 開発サーバーの起動
```bash
# フロントエンド
cd frontend
npm run dev

# バックエンド
cd backend
npm run dev
```

### テストの実行
```bash
# フロントエンド
cd frontend
npm test

# バックエンド
cd backend
npm test
```

## コントリビューション
1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## ライセンス
このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。
