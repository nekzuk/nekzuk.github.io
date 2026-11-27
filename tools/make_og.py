"""
製品ページの OGP 画像（assets/og/<製品>_ja.png / _en.png）を作るスクリプト

使い方（リポジトリのフォルダで実行。Pillow が必要）:
    python tools/make_og.py                     # 全製品
    python tools/make_og.py nai-smart-studio    # 指定した製品だけ

画像の文言はページ本文に合わせています（キャッチコピー = 各ページの h1）。
ページの h1 を変えたら下の P も直して作り直してください。
フッターの対応OS（「Windows 10 / 11」など）は tools/platforms.json から読みます。
Mac 対応にしたら、platforms.py の実行と合わせてこのスクリプトも実行してください。
トップページ用の画像は make_og_home.py です。
"""
import io
import json
import sys
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = os.path.join(root, 'assets', 'og')
only = sys.argv[1:]
PCFG = json.load(io.open(os.path.join(root, 'tools', 'platforms.json'), encoding='utf-8'))


def os_label(slug, lang):
    oses = [o for o in ('windows', 'mac') if o in PCFG['products'][slug]]
    return ' · '.join(PCFG['labels'][o]['range_' + lang] for o in oses)


NOTO = 'C:/Windows/Fonts/NotoSansJP-VF.ttf'
W, H = 1200, 630
ACC = (97, 80, 165)


def font(size, w='Bold'):
    f = ImageFont.truetype(NOTO, size)
    f.set_variation_by_name(w)
    return f


# slug: icon, name, (edition ja, en) or None, (h1 ja, h1 en) with the page's line break
P = {
    'automosaic': ('app_general.png', 'AutoMosaic', ('一般版', 'General'),
                   ('画像をまとめて、\n自動でモザイク。', 'Automatically apply mosaic\nto image batches.')),
    'automosaic-r18': ('app_R18.png', 'AutoMosaic', ('R18版', 'R18'),
                       ('画像をまとめて、\n自動でモザイク。', 'Automatically apply mosaic\nto image batches.')),
    'automosaic-video': ('app_video_general.jpg', 'AutoMosaic Video', ('一般版', 'General'),
                         ('動く対象を追って、\n自動でモザイク。', 'Follow moving subjects.\nApply mosaic automatically.')),
    'automosaic-video-r18': ('app_video_R18.jpg', 'AutoMosaic Video', ('R18版', 'R18'),
                             ('動く対象を追って、\n自動でモザイク。', 'Follow moving subjects.\nApply mosaic automatically.')),
    'ai-paint-cleaner': ('app2.png', 'AI Paint Cleaner', None,
                         ('画像の気になるところを、\nひとつのアプリで整える。', 'Fix the details,\nall in one app.')),
    'nai-smart-studio': ('app_nai.png', 'NAI Smart Studio', None,
                         ('生成から管理まで、\nひとつのアプリで。', 'From generation to prompts,\nall in one app.')),
    'ai-meta-cleaner': ('app3.png', 'AI Meta Cleaner', ('無料', 'Free'),
                        ('公開前に、\n埋め込み情報を除去。', 'Before sharing,\nremove embedded data.')),
    'meta-converter': ('app4.png', 'Meta Converter', None,
                       ('生成情報を残して、\n軽く。', 'Smaller files.\nKeep generation info.')),
    'frame-craft': ('app5.png', 'Frame Craft', None,
                    ('動画から、\n欲しい画像を。', 'Get the frames\nyou need.')),
}


def rounded(im, r):
    m = Image.new('L', im.size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, im.size[0] - 1, im.size[1] - 1], r, fill=255)
    im.putalpha(m)
    return im


def card(slug, lang):
    icon, name, ed, catch = P[slug]
    li = 0 if lang == 'ja' else 1
    bg = Image.new('RGBA', (W, H), (246, 245, 251, 255))
    blob = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    bd = ImageDraw.Draw(blob)
    bd.ellipse([-260, -200, 620, 760], fill=ACC + (46,))
    bd.ellipse([820, -260, 1460, 300], fill=ACC + (22,))
    bg.alpha_composite(blob.filter(ImageFilter.GaussianBlur(80)))

    # medium icon (about 70% of the previous simple version)
    ic = Image.open(os.path.join(root, 'assets', 'icons', icon)).convert('RGBA')
    ic.thumbnail((224, 224), Image.LANCZOS)
    if ic.getextrema()[3][0] == 255:
        ic = rounded(ic, 28)
    ix = 104
    iy = (H - ic.height) // 2 - 16
    sh = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle([ix + 4, iy + 16, ix + ic.width + 4, iy + ic.height + 16], 28, fill=(40, 30, 90, 80))
    bg.alpha_composite(sh.filter(ImageFilter.GaussianBlur(20)))
    bg.alpha_composite(ic, (ix, iy))

    d = ImageDraw.Draw(bg)
    L = ix + 224 + 72
    maxw = W - L - 64
    nf = font(70, 'Bold')
    while d.textlength(name, font=nf) > maxw:
        nf = font(nf.size - 2, 'Bold')
    cf = font(38 if lang == 'ja' else 36, 'Medium')
    lines = catch[li].split('\n')
    while max(d.textlength(x, font=cf) for x in lines) > maxw:
        cf = font(cf.size - 1, 'Medium')
    block = int(nf.size * 1.25) + (66 if ed else 14) + len(lines) * int(cf.size * 1.5)
    y = (H - block) // 2 - 16
    d.text((L, y - int(nf.size * 0.12)), name, font=nf, fill=(28, 26, 40))
    y += int(nf.size * 1.25)
    if ed:
        ef = font(26, 'Bold')
        e = ed[li]
        ew = d.textlength(e, font=ef)
        d.rounded_rectangle([L, y, L + ew + 36, y + 46], 23, fill=ACC)
        d.text((L + 18, y + 3), e, font=ef, fill='white')
        y += 66
    else:
        y += 14
    for x in lines:
        d.text((L, y), x, font=cf, fill=(62, 58, 84))
        y += int(cf.size * 1.5)

    ff = font(24, 'Bold')
    d.text((L, H - 86), 'nekzuk Software', font=ff, fill=ACC)
    d.text((L + d.textlength('nekzuk Software', font=ff) + 18, H - 86), os_label(slug, lang), font=font(22, 'Regular'), fill=(120, 116, 140))
    fn = f'{slug}_{lang}.png'
    bg.convert('RGB').save(os.path.join(out, fn), optimize=True)
    print(fn, end=' ')


for s in P:
    if only and s not in only:
        continue
    card(s, 'ja')
    card(s, 'en')
