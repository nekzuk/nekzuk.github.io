# ファビコン・アイコン実装ガイド

## 1. ファイルをGitHubリポジトリに配置

以下のファイルをリポジトリの **ルートディレクトリ** に配置してください：

```
nekzuk.github.io/
├── favicon.ico          ← ここ
├── icon.svg             ← ここ
├── apple-touch-icon.png ← ここ
├── icon-192.png         ← ここ
├── icon-512.png         ← ここ
├── og-image.png         ← ここ（既存のassets/og-image.pngは削除して、ルートに配置）
├── index.html
├── index_j.html
├── robots.txt
├── sitemap.xml
└── assets/
    └── icons/
        └── ...
```

## 2. HTMLファイルを更新

`index.html` と `index_j.html` の両方を編集します。

### 編集箇所

`<head>` タグ内の `<title>` タグの **直前** に、以下のコードを挿入：

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- ★★★ ここに新しいコードを追加 ★★★ -->
    <!-- ファビコン・アイコン設定 -->
    <link rel="icon" href="/favicon.ico" sizes="32x32">
    <link rel="icon" href="/icon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
    <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png">
    <meta name="theme-color" content="#6366f1">
    <!-- ★★★ ここまで ★★★ -->
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="...">
    ...
```

### OGP画像のパス修正

既存のこの2行を：

```html
<meta property="og:image" content="https://nekzuk.github.io/assets/og-image.png">
<meta name="twitter:image" content="https://nekzuk.github.io/assets/og-image.png">
```

以下のように修正：

```html
<meta property="og:image" content="https://nekzuk.github.io/og-image.png">
<meta name="twitter:image" content="https://nekzuk.github.io/og-image.png">
```

## 3. GitHubにプッシュ

```bash
git add favicon.ico icon.svg apple-touch-icon.png icon-192.png icon-512.png og-image.png
git add index.html index_j.html
git commit -m "Add favicon and icons"
git push
```

## 4. 確認方法

プッシュ後、数分待ってから：

1. **ブラウザのタブ** にアイコンが表示されるか確認
2. **スマホのホーム画面に追加** → アイコンが表示されるか確認
3. **OGPの確認**：
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - Facebook Debugger: https://developers.facebook.com/tools/debug/
   - URLを入力して画像が表示されるか確認

## トラブルシューティング

- **アイコンが表示されない** → ブラウザのキャッシュをクリア（Ctrl+Shift+Delete）
- **古いアイコンが表示される** → ハードリフレッシュ（Ctrl+F5）
- **GitHub Pagesに反映されない** → 5-10分待つ（反映に時間がかかる場合があります）
