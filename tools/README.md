# tools

サイトの表記や画像をまとめて更新するためのスクリプトです。リポジトリのフォルダ（`nekzuk.github.io`）で実行します。

## 対応OSの切り替え（Mac 版を出すとき）

1. `tools/platforms.json` を開く。
2. `labels.mac` の `TODO` の部分を、Mac 版の動作環境に書き換える。
   - `range_ja` / `range_en`：ページに出す表記（例：`macOS 13以降` / `macOS 13 or later`）
   - `ld`：構造化データの `operatingSystem` に入る表記（例：`macOS 13`）
3. `products` で、Mac 版を出す製品を `["windows", "mac"]` にする。
4. Mac 版を1つでも出したら、`site` も `["windows", "mac"]` にする（トップページ全体の説明文と「Windows」の表示が変わる）。
5. 次を順に実行する。

```
python tools/platforms.py            # 変わるファイルを確認（まだ書き換えない）
python tools/platforms.py --apply    # 書き換える
python tools/platforms.py --check    # 取りこぼしがないか確認
python tools/make_og.py              # OGP 画像のフッターの対応OSも更新
```

`["windows"]` に戻して同じ手順を実行すると、元の表記に戻ります。

### 自動で書き換わるもの
- スペック表の OS 行（Mac は改行して2行目に）、冒頭の価格行、ダウンロード欄の対応OS
- 体験版欄の「製品名 / Windows」
- 説明文・タイトル・メタ情報・構造化データの「Windows向け」「for Windows」などの言い回し
- 構造化データの `operatingSystem`
- トップページ：製品一覧の構造化データ（製品ごと）、サイト全体の説明文、冒頭の「Windows」の表示
- OGP 画像のフッター（`make_og.py` を実行したとき）

### 手作業が必要なもの
- Mac 版のダウンロードリンク・購入リンク（体験版・購入欄）
- Mac の画面写真、Mac 固有の注意事項、よくある質問の Mac に関する質問
- 新しい言い回しで「Windows」を書き足したとき：`--check` に出たら、`platforms.py` の `PROSE` に言い回しを足すか、既存の言い回しに合わせる

## OGP 画像

- `python tools/make_og.py`：製品ページ用（`assets/og/<製品>_ja.png` / `_en.png`）。キャッチコピーは各ページの h1 と同じ。ページの h1 を変えたらスクリプト内の文言も直す。
- `python tools/make_og_home.py`：トップページ・規約・プライバシー用（`assets/og/index_ja.png` / `_en.png`）。
- Pillow と、Windows 標準のフォント（Noto Sans JP、游ゴシック）を使います。
- X（旧Twitter）は画像を1週間ほどキャッシュするため、差し替えてもすぐには反映されないことがあります。
