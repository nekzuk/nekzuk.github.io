import sys,os
from PIL import Image,ImageDraw,ImageFont,ImageFilter
# トップページ用の OGP 画像（assets/og/index_ja.png / index_en.png）を作るスクリプト
# 使い方: python tools/make_og_home.py （リポジトリのフォルダで実行。Pillow が必要）
# 製品を増やしたら下の icons にアイコンを足してください。対応OSは画像に入れていません。
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); F='C:/Windows/Fonts/'
font=lambda s,b=False: ImageFont.truetype(F+('YuGothB.ttc' if b else 'YuGothM.ttc'),s)
W,H=1200,630; ACC=(97,80,165)
icons=['app_general.png','app_R18.png','app_video_general.jpg','app_video_R18.jpg','app_nai.png','app2.png','app3.png','app4.png','app5.png']
for lang,tag,sub in [('ja','画像・動画制作をもっとスムーズに','自動モザイク / 画像生成・編集 / 変換・整理 ― Windows向けツール'),('en','Smoother image & video workflows','Auto mosaic / image generation & editing / conversion — tools for Windows')]:
    bg=Image.new('RGB',(W,H),(246,245,251))
    blob=Image.new('RGBA',(W,H),(0,0,0,0)); dd=ImageDraw.Draw(blob); dd.ellipse([-200,-300,700,400],fill=(97,80,165,36)); dd.ellipse([700,250,1500,900],fill=(97,80,165,30)); blob=blob.filter(ImageFilter.GaussianBlur(70)); bg.paste(blob,(0,0),blob)
    d=ImageDraw.Draw(bg)
    bf=font(30,True); d.text((80,90),'nekzuk Software',font=bf,fill=ACC)
    tf=font(64 if lang=='ja' else 62,True); d.text((80,145),tag,font=tf,fill=(28,26,40))
    sf=font(26); d.text((80,245),sub,font=sf,fill=(80,76,100))
    n=len(icons); size=104; gap=(W-160-n*size)/(n-1); y=380
    for i,ic in enumerate(icons):
        im=Image.open(os.path.join(root,'assets/icons',ic)).convert('RGBA'); im.thumbnail((size,size),Image.LANCZOS)
        x=int(80+i*(size+gap)); 
        sh=Image.new('RGBA',(W,H),(0,0,0,0)); ImageDraw.Draw(sh).rounded_rectangle([x,y+8,x+im.width,y+8+im.height],20,fill=(40,30,90,60)); sh=sh.filter(ImageFilter.GaussianBlur(10)); bg.paste(sh,(0,0),sh)
        bg.paste(im,(x,y+(size-im.height)//2),im)
    d.text((80,H-80),'nekzuk.com',font=font(24,True),fill=(120,116,140))
    bg.save(os.path.join(root,'assets/og',f'index_{lang}.png'),optimize=True)
