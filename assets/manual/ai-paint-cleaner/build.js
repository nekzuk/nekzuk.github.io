/*
 * AI Paint Cleaner マニュアル — HTML 書き出し
 *   使い方:  node build.js        （このフォルダで実行）
 * content.ja.js / content.en.js を読み、トップページと各ページの HTML を書き出します。
 * 文章や画像を直したら content.*.js を編集して、これを実行するだけです。
 * sitemap 用の行は _sitemap-snippet.xml に出力します（sitemap.xml へ貼り付け用）。
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const R = require("./manual-render.js");

const DIR = __dirname;
const BASE = "https://nekzuk.com/assets/manual/ai-paint-cleaner/";

const load = lang => {
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(DIR, `content.${lang}.js`), "utf8"), ctx);
  return ctx.window.MANUAL;
};
const DATA = { ja: load("ja"), en: load("en") };
const STR = {
  ja: { manual: "マニュアル", docTitle: "操作マニュアル", theme: "配色を切り替える", product: "製品ページに戻る", productUrl: "/ai-paint-cleaner_j.html" },
  en: { manual: "User Manual", docTitle: "User Manual", theme: "Switch theme", product: "Back to product page", productUrl: "/ai-paint-cleaner.html" }
};

function page(lang, id) {
  const M = DATA[lang], V = R.create(M), S = STR[lang];
  const other = lang === "ja" ? "en" : "ja";
  const file = l => (id === "home" ? R.homeFile(l) : R.pageFile(l, id));
  const P = id === "home" ? null : M.pages[id];
  const title = P ? `${P.title} - AI Paint Cleaner ${S.docTitle}` : `AI Paint Cleaner - ${S.docTitle}`;
  const desc = (P ? P.summary + " " + P.lead : M.ui.heroLead).replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/\*\*/g, "");
  const body = id === "home" ? V.home() : V.detail(id);
  const langLinks = lang === "ja"
    ? `<a href="${file("en")}" data-keep-hash>English</a>\n      <span class="divider">/</span>\n      <a href="${file("ja")}" class="current">日本語</a>`
    : `<a href="${file("en")}" class="current">English</a>\n      <span class="divider">/</span>\n      <a href="${file("ja")}" data-keep-hash>日本語</a>`;
  return `<!doctype html>
<!-- build.js が自動生成したファイルです。直接編集せず content.${lang}.js を直して node build.js を実行してください。 -->
<html data-site-page="manual" data-product="ai-paint-cleaner_online_manual" lang="${lang}">
<head>
<script>
  if (!["nekzuk.com", "www.nekzuk.com"].includes(window.location.hostname.toLowerCase())) {
    window["ga-disable-G-040P2W2ZZK"] = true;
  }
</script>
<meta charset="utf-8">
<meta name="color-scheme" content="dark light">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${R.esc(title)}</title>
<meta name="description" content="${R.esc(desc)}">
<link rel="canonical" href="${BASE}${file(lang)}">
<link rel="alternate" hreflang="en" href="${BASE}${file("en")}">
<link rel="alternate" hreflang="ja" href="${BASE}${file("ja")}">
<link rel="alternate" hreflang="x-default" href="${BASE}${file("en")}">
<meta property="og:type" content="article">
<meta property="og:title" content="${R.esc(title)}">
<meta property="og:description" content="${R.esc(desc)}">
<meta property="og:url" content="${BASE}${file(lang)}">
<meta property="og:image" content="${BASE}images/${M.screen.src.replace(/^images\//, "")}">
<link href="/assets/favicons/favicon.ico" rel="icon" sizes="32x32">
<link href="/assets/favicons/icon.svg" rel="icon" type="image/svg+xml">
<link href="/assets/favicons/apple-touch-icon.png" rel="apple-touch-icon">
<meta name="theme-color" content="#6150a5">
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-040P2W2ZZK"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag("js", new Date());
  gtag("config", "G-040P2W2ZZK");
</script>
<link rel="stylesheet" href="../../site-base.css">
<link rel="stylesheet" href="manual.css">
<script src="../../js/site-theme.js"></script>
</head>
<body data-page="${id}">
<header class="top">
  <a class="brand" href="${R.homeFile(lang)}"><img src="images/icons/app.png" alt=""><span><b>AI Paint Cleaner</b><small>${S.manual}</small></span></a>
  <a class="back-to-product" href="${S.productUrl}">← ${S.product}</a>
  <div class="search"><input id="q" type="search" autocomplete="off" aria-label="${R.esc(M.ui.search)}" placeholder="${R.esc(M.ui.search)}"><div id="res" class="res" hidden></div></div>
  <div class="site-controls">
    <div class="language-switch">
      ${langLinks}
    </div>
    <button class="site-theme-toggle" type="button" aria-label="${S.theme}" title="${S.theme}" hidden>
      <svg class="site-theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg>
      <svg class="site-theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>
    </button>
  </div>
</header>
<main id="app" class="${id === "home" ? "home" : "detail"}">${body}
</main>
<footer class="foot">${V.footer()}</footer>
<script src="content.${lang}.js" defer></script>
<script src="manual-render.js" defer></script>
<script src="manual.js" defer></script>
</body>
</html>
`;
}

const written = [], urls = [];
for (const lang of ["ja", "en"]) {
  for (const id of ["home", ...Object.keys(DATA[lang].pages)]) {
    const f = id === "home" ? R.homeFile(lang) : R.pageFile(lang, id);
    fs.writeFileSync(path.join(DIR, f), page(lang, id));
    written.push(f);
    if (lang === "en") {
      const ja = id === "home" ? R.homeFile("ja") : R.pageFile("ja", id);
      for (const u of [f, ja]) urls.push(`  <url>
    <loc>${BASE}${u}</loc>
    <lastmod>${DATA.ja.meta.updated}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${id === "home" ? "0.6" : "0.5"}</priority>
  </url>`);
    }
  }
}
fs.writeFileSync(path.join(DIR, "_sitemap-snippet.xml"), urls.join("\n") + "\n");
console.log(`${written.length} files written:\n  ` + written.join("\n  ") + "\n  _sitemap-snippet.xml");
