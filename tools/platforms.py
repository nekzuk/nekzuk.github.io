"""
対応OSの表記を一括で書き換えるスクリプト

使い方（リポジトリのフォルダで実行）:
    python tools/platforms.py            # 書き換えずに、変わる箇所の数だけ表示（確認用）
    python tools/platforms.py --apply    # 実際に書き換える
    python tools/platforms.py --check    # 変換表で扱えない「Windows」「Mac」が残っていないか一覧表示

設定は tools/platforms.json。products の値を ["windows", "mac"] にすると、
その製品のページ（日英）とトップページの該当製品の記述が Mac 対応の表記になります。
["windows"] に戻して実行すれば、元の表記に戻ります。

書き換える場所:
  - スペック表の OS 行、冒頭の価格行、ダウンロード欄の「v1.30 · Windows 10 / 11」
  - 体験版欄の「製品名 / Windows」
  - 説明文・メタ情報・構造化データの「Windows向け」「for Windows」など（下の PROSE の一覧）
  - 構造化データの operatingSystem
  - トップページ：製品一覧の構造化データは製品ごと、サイト全体の説明文と「Windows」の表示は "site" の設定に従う
"""
import io
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CFG = json.load(io.open(os.path.join(ROOT, 'tools', 'platforms.json'), encoding='utf-8'))
LB = CFG['labels']
ORDER = ['windows', 'mac']
COMBOS = [('windows',), ('windows', 'mac')]  # 書き換え前の状態として想定する組み合わせ


def norm(oses):
    return tuple(o for o in ORDER if o in oses)


def lab(oses, key):
    return [LB[o][key] for o in norm(oses)]


# ---- 表記の作り方（OS の組み合わせ -> 文字列）----
def range_(oses, lang):
    return ' · '.join(lab(oses, 'range_' + lang))


def short(oses, lang):
    return ('・' if lang == 'ja' else ' & ').join(lab(oses, 'short_' + lang))


def ld(oses):
    return ', '.join(lab(oses, 'ld'))


def ja_x(oses):
    return '・'.join(lab(oses, 'short_ja'))


def en_e(oses):
    return ' and '.join(lab(oses, 'short_en'))


def single(oses):
    return len(norm(oses)) == 1


# 文中の言い回し。長いもの・具体的なものから順に処理する。
PROSE = [
    lambda o: f'A {en_e(o)} image editor' if single(o) else f'An image editor for {en_e(o)}',
    lambda o: f'{en_e(o)} image editor' if single(o) else f'Image editor for {en_e(o)}',
    lambda o: f'A {en_e(o)} desktop app' if single(o) else f'A desktop app for {en_e(o)}',
    lambda o: f'{en_e(o)} desktop app' if single(o) else f'Desktop app for {en_e(o)}',
    lambda o: f'A {en_e(o)} app that' if single(o) else f'An app for {en_e(o)} that',
    lambda o: f'A {en_e(o)} tool.' if single(o) else f'A tool for {en_e(o)}.',
    lambda o: f'for {en_e(o)}',
    lambda o: f'on {en_e(o)}',
    lambda o: f'{ja_x(o)}向け',
    lambda o: f'{ja_x(o)}ツール',
]


def sub_family(text, make, target):
    """make(組み合わせ) で作られる表記のどれかを、target の組み合わせの表記に置き換える"""
    forms = sorted({make(c) for c in COMBOS} | {make(target)}, key=len, reverse=True)
    want = make(target)
    pat = '|'.join(re.escape(f) for f in forms)
    return re.subn(pat, lambda m: want, text)


def prose(text, oses):
    n = 0
    for make in PROSE:
        text, k = sub_family(text, make, oses)
        n += k
    return text, n


def structural(text, oses, lang):
    n = 0
    # 価格行・ダウンロード欄などの「Windows 10 / 11」
    forms = sorted({range_(c, lang) for c in COMBOS} | {range_(oses, lang)}, key=len, reverse=True)
    text, k = re.subn('|'.join(re.escape(f) for f in forms), lambda m: range_(oses, lang), text)
    n += k

    # スペック表の OS 行は最後に丸ごと作り直す（Windows は「64bit」の注記付き。Mac は改行して別の行に）
    def dd(_m):
        rows = []
        for o in norm(oses):
            r = LB[o]['range_' + lang]
            rows.append(r + ' <small>64bit</small>' if o == 'windows' else r)
        return '<dt>OS</dt><dd>' + '<br>'.join(rows) + '</dd>'
    text, k = re.subn(r'<dt>OS</dt><dd>.*?</dd>', dd, text, flags=re.S)
    n += k
    # 体験版欄「製品名 / Windows」
    forms = sorted({short(c, lang) for c in COMBOS} | {short(oses, lang)}, key=len, reverse=True)
    text, k = re.subn(r'(/ )(' + '|'.join(re.escape(f) for f in forms) + r')(</p>)',
                      lambda m: m.group(1) + short(oses, lang) + m.group(3), text)
    n += k
    return text, n


def os_field(text, oses):
    return re.subn(r'("operatingSystem":\s*")[^"]*(")', lambda m: m.group(1) + ld(oses) + m.group(2), text)


def product_page(path, oses, lang):
    t = io.open(path, encoding='utf-8', newline='').read()
    t2, a = structural(t, oses, lang)
    t2, b = os_field(t2, oses)
    t2, c = prose(t2, oses)
    return t, t2, a + b + c


def index_page(path, products, site, lang):
    t = io.open(path, encoding='utf-8', newline='').read()
    total = 0
    # 製品一覧の構造化データ：SoftwareApplication ごとに区切り、製品の設定で書き換える
    starts = [m.start() for m in re.finditer(r'\{\s*"@type":\s*"SoftwareApplication"', t)]
    pieces, last = [], 0
    for i, s in enumerate(starts):
        e = t.find('"offers"', s)
        seg = t[s:e]
        m = re.search(r'"url":\s*"https://nekzuk\.com/([a-z0-9-]+?)(?:_j)?\.html"', seg)
        if m and m.group(1) in products:
            o = products[m.group(1)]
            seg, a = os_field(seg, o)
            seg, b = prose(seg, o)
            total += a + b
        pieces.append(t[last:s])
        pieces.append(seg)
        last = e
    pieces.append(t[last:])
    t2 = ''.join(pieces)
    # 残り（サイト全体の説明文・「Windows」の表示）は site の設定で書き換える
    marks = [(m.start(), m.end()) for m in re.finditer(r'\{\s*"@type":\s*"SoftwareApplication".*?"offers"', t2, re.S)]
    out, last = [], 0
    for s, e in marks + [(len(t2), len(t2))]:
        chunk, k = prose(t2[last:s], site)
        total += k
        out.append(chunk)
        out.append(t2[s:e])
        last = e
    t2 = ''.join(out)
    forms = sorted({short(c, lang) for c in COMBOS} | {short(site, lang)}, key=len, reverse=True)
    t2, k = re.subn(r'(<div class="intro-facts">\s*<span>\s*)(' + '|'.join(re.escape(f) for f in forms) + r')(\s*</span>)',
                    lambda m: m.group(1) + short(site, lang) + m.group(3), t2)
    total += k
    return t, t2, total


def jobs():
    prods = {k: norm(v) for k, v in CFG['products'].items()}
    site = norm(CFG['site'])
    for slug, oses in prods.items():
        for lang, suf in (('en', ''), ('ja', '_j')):
            yield os.path.join(ROOT, f'{slug}{suf}.html'), (lambda p, o=oses, l=lang: product_page(p, o, l))
    for lang, f in (('en', 'index.html'), ('ja', 'index_j.html')):
        yield os.path.join(ROOT, f), (lambda p, l=lang: index_page(p, prods, site, l))


def check():
    """変換表で扱えない Windows / Mac の記述を一覧表示する"""
    # スクリプトが作りうる表記をすべて集め、その中に含まれる Windows / Mac は「扱える」とみなす
    forms = set()
    for c in COMBOS:
        forms |= {make(c) for make in PROSE}
        forms.add(ld(c))
        for lang in ('ja', 'en'):
            forms |= {range_(c, lang), short(c, lang)}
            forms |= {LB[o]['range_' + lang] for o in c}
    forms = sorted(forms, key=len, reverse=True)
    found = 0
    for path, _ in jobs():
        t = io.open(path, encoding='utf-8').read()
        t = re.sub(r'<!--.*?-->', '', t, flags=re.S)
        spans = [(m.start(), m.end()) for f in forms for m in re.finditer(re.escape(f), t)]
        for m in re.finditer(r'Windows|Mac(?!ro)|macOS', t):
            if not any(s <= m.start() < e for s, e in spans):
                ctx = t[max(0, m.start() - 40):m.end() + 40]
                found += 1
                print(os.path.basename(path), '|', ctx.replace('\n', ' '))
    if not found:
        print('変換表で扱えない記述はありません。')


def main():
    if '--check' in sys.argv:
        check()
        return
    for o in sum(([v] for v in CFG['products'].values()), [CFG['site']]):
        if 'mac' in o and any('TODO' in v for v in LB['mac'].values()):
            sys.exit('platforms.json の mac の表記に TODO が残っています。Mac 版の動作環境を書いてから実行してください。')
    apply = '--apply' in sys.argv
    changed = 0
    for path, fn in jobs():
        before, after, n = fn(path)
        if before != after:
            changed += 1
            print(f'{"書き換え" if apply else "変更あり"}: {os.path.basename(path)}')
            if apply:
                io.open(path, 'w', encoding='utf-8', newline='').write(after)
    print(f'{changed} ファイル' + ('を書き換えました。' if apply else 'が変わります（--apply で書き換え）。'))


if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    main()
