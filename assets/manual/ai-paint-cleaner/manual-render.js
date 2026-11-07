/*
 * AI Paint Cleaner マニュアル — HTML生成（ブラウザと build.js の両方で使う共通部分）
 * content.*.js（window.MANUAL）から、トップページと各ページの本文HTMLを作ります。
 */
(function (root) {
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  /* key names: modifiers only next to + / ／, Delete/Enter/Esc not at the start of a label or inside quotes */
  const KEY = /((?:Ctrl|Shift|Alt)(?=\s?[+＋／\/])|(?<=[+＋／\/]\s?)(?:Ctrl|Shift|Alt)\b|(?<=.)(?<!quot;|「)(?:Delete|Enter|Esc)\b|F1|F2|←|→|↑|↓|(?<=[＋+]\s?)[A-Z0-9,.](?![A-Za-z0-9]))/g;

  /* file names: home = ai-paint-cleaner_online_manual(_j).html, pages = <id>(_j).html */
  const HOME = "ai-paint-cleaner_online_manual";
  const sfx = lang => (lang === "ja" ? "_j" : "");
  const homeFile = lang => `${HOME}${sfx(lang)}.html`;
  const pageFile = (lang, id) => `${id}${sfx(lang)}.html`;

  function create(M) {
    const U = M.ui, lang = M.lang;
    const pageIds = Object.keys(M.pages);
    const page = id => M.pages[id];
    /* "#/p/x/y" or "x/y" -> x(_j).html#y ; "#/map/id" -> home#/map/id */
    const href = h => {
      if (!h) return homeFile(lang);
      if (h.startsWith("#/map/")) return homeFile(lang) + h;
      const m = h.replace(/^#\/p\//, "").split("/");
      return pageFile(lang, m[0]) + (m[1] ? "#" + m[1] : "");
    };
    const link = (t, h) => h === "email"
      ? `<a href="#" class="protected-email" data-email-user="nekzuk.software" data-email-domain="gmail.com">${t}</a>`
      : /^https?:/.test(h) ? `<a href="${h}" target="_blank" rel="noopener">${t} ↗</a>` : `<a href="${href(h)}">${t}</a>`;
    /* [label](#/p/...) internal, [label](https://...) external, [label](email) protected e-mail */
    const fmt = s => esc(s).replace(/\[([^\]]+)\]\(((?:#|https?:\/\/|email)[^)]*)\)/g, "\u0000$1\u0001$2\u0002")
      .replace(KEY, "<kbd>$1</kbd>").replace(/\u0000(.*?)\u0001(.*?)\u0002/g, (m, t, h) => link(t, h))
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
    const ico = (f, cls = "") => f ? `<img class="${cls}" src="images/icons/${f}" alt="">` : "";

    /* ---------- home ---------- */
    function home() {
      const S = M.screen;
      const regions = M.tools.map(t => {
        const [x, y, w, h] = t.region;
        return `<button class="rg g-${t.group}${t.group === "panel" ? " panel" : ""}" data-id="${t.id}" aria-label="${esc(t.name)}" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%">${t.group === "panel" ? `<span class="lbl">${esc(t.name)}</span>` : ""}</button>`;
      }).join("");
      const legend = Object.entries(M.groups).map(([k, v]) => `<span class="g-${k}"><i></i>${esc(v)}</span>`).join("");
      const start = M.quickstart.map((s, i) => `<li><b>${i + 1}</b><div><strong>${esc(s.t)}</strong><span>${fmt(s.d)}</span></div></li>`).join("");
      const cards = pageIds.map(id => {
        const P = page(id);
        return `<a class="pcard" href="${pageFile(lang, id)}">${ico(P.icon)}<div><b>${esc(P.title)}</b><span>${esc(P.summary)}</span></div></a>`;
      }).join("");
      const controls = M.controls.map(([a, m, k]) => `<tr><td>${esc(a)}</td><td>${fmt(m)}</td><td>${fmt(k)}</td></tr>`).join("");
      const faq = M.faq.map(f => `<details><summary>${esc(f.q)}</summary><p>${fmt(f.a)}${f.link ? ` <a href="${href(f.link)}">${U.detail} →</a>` : ""}</p></details>`).join("");
      /* text-only list of every map area, so the screen map content is in the HTML too */
      const mapList = M.tools.map(t => `<li><b>${esc(t.name)}</b>: ${fmt(t.summary)}</li>`).join("");
      return `
      <section class="hero">
        <div><h1>${esc(M.meta.title)}</h1><p>${esc(U.heroLead)}</p></div>
        <ol class="start">${start}</ol>
      </section>
      <h2 id="map">${U.mapTitle}<small>${U.mapLead}</small></h2>
      <div class="shot" id="shot"><img src="${S.src}" width="${S.w}" height="${S.h}" alt="${esc(M.meta.title)}">${regions}<div class="pop" id="pop" hidden></div></div>
      <div class="legend">${legend}</div>
      <ul class="sr-only">${mapList}</ul>
      <h2 id="pages">${U.pagesTitle}</h2>
      <div class="pcards">${cards}</div>
      <div class="two">
        <section><h2 id="controls">${U.controlsTitle}</h2><p class="lead">${fmt(U.controlsLead)}</p>
          <div class="tw"><table><tr><th>${U.action}</th><th>${U.mouse}</th><th>${U.keyboard}</th></tr>${controls}</table></div>
          <p class="more"><a href="${href("basics/shortcuts")}">${U.allShortcuts} →</a></p></section>
        <section><h2 id="faq">${U.faqTitle}</h2><div class="faq">${faq}</div></section>
      </div>
      ${M.automosaic ? `<section class="am"><div><h2>${esc(M.automosaic.title)}</h2><p>${esc(M.automosaic.text)}</p></div><div class="amlinks">${M.automosaic.links.map(([t, h]) => `<a href="${href(h)}">${esc(t)} →</a>`).join("")}</div></section>` : ""}`;
    }

    /* map popover (home only, built in the browser) */
    function popover(t) {
      const P = page(t.page);
      return `
      <button class="x" aria-label="close">×</button>
      <span class="tag">${esc(M.groups[t.group])}</span>
      <h3>${ico(t.icon)}${esc(t.name)}</h3>
      <p>${fmt(t.summary)}</p>
      <ul>${t.items.map(i => `<li>${fmt(i)}</li>`).join("")}</ul>
      ${P ? `<a class="btn" href="${href(t.page + (t.anchor ? "/" + t.anchor : ""))}">${esc(P.title)} — ${U.detail} →</a>` : ""}`;
    }

    /* ---------- detail page ---------- */
    const num = n => `<span class="num">${n}</span>`;
    const rowsTable = rows => `<table class="rows">${rows.map(([a, b], i) => `<tr data-n="${i}"><td>${num(i + 1)}${fmt(a)}</td><td>${fmt(b)}</td></tr>`).join("")}</table>`;
    const head = b => b.title ? `<h2 id="${b.id || ""}">${esc(b.title)}</h2>${b.lead ? `<p class="lead">${fmt(b.lead)}</p>` : ""}` : "";
    const img = (src, w, h, alt = "") => `<img src="${src}" width="${w}" height="${h}" alt="${esc(alt)}" loading="lazy" data-zoom>`;

    const R = {
      strip: b => `${head(b)}<div class="fig" data-fig>
        <div class="stripscroll"><div class="stripbox" style="max-width:${b.w * (b.scale || 1.5)}px;--sw:${b.w}px"><div class="pic">${img(b.src, b.w, b.h, b.title)}</div>
          <div class="ticks">${b.markers.map((x, i) => `<span class="mk" data-n="${i}" style="left:${x}%">${i + 1}</span>`).join("")}</div></div></div>
        ${rowsTable(b.rows)}</div>${b.note ? `<p class="note">${fmt(b.note)}</p>` : ""}`,
      figure: b => `${head(b)}<div class="fig ${b.stack ? "stack" : "sidefig"}" data-fig style="--pw:${b.pw || 320}px">
        <div class="pic">${img(b.src, b.w, b.h, b.title)}${(b.markers || []).map(([x, y], i) => `<span class="mk" data-n="${i}" style="left:${x}%;top:${y}%">${i + 1}</span>`).join("")}</div>
        <div>${b.rows ? rowsTable(b.rows) : ""}${b.note ? `<p class="note">${fmt(b.note)}</p>` : ""}</div></div>`,
      image: b => `${head(b)}<figure class="single" style="max-width:${b.maxw || b.w}px">${img(b.src, b.w, b.h, b.title)}${b.caption ? `<figcaption>${fmt(b.caption)}</figcaption>` : ""}</figure>`,
      gallery: b => `${head(b)}<div class="gallery${b.items.some(i => i.src) ? " wide" : ""}">${b.items.map(it => `
        <figure class="ba"><figcaption><b>${esc(it.title)}</b>${it.sub ? `<span>${esc(it.sub)}</span>` : ""}</figcaption>
          ${it.src ? img(it.src, it.w, it.h, it.title) : `<div class="pair${it.alpha ? " alpha" : ""}"><div>${img(it.a, it.w, it.h, it.title + " " + U.before)}<i>${U.before}</i></div><div>${img(it.b, it.w2 || it.w, it.h2 || it.h, it.title + " " + U.after)}<i>${U.after}</i></div></div>`}
          ${it.note ? `<p>${fmt(it.note)}</p>` : ""}</figure>`).join("")}</div>`,
      cards: b => `${head(b)}<div class="modes">${b.groups.map(g => `
        <div class="mode" style="--mc:${g.color || "var(--accent)"}"><h3>${esc(g.title)}${g.tag ? `<small>${esc(g.tag)}</small>` : ""}</h3>
          ${g.desc ? `<p>${fmt(g.desc)}</p>` : ""}
          ${g.items ? `<dl>${g.items.map(([a, c, l]) => `<dt>${esc(a)}</dt><dd>${fmt(c)}${l ? ` <a href="${href(l)}">→</a>` : ""}</dd>`).join("")}</dl>` : ""}${g.link ? `<a class="more" href="${href(g.link)}">${U.detail} →</a>` : ""}</div>`).join("")}</div>`,
      flow: b => `${head(b)}<ol class="flow">${b.steps.map((st, i) => `<li><div class="ft"><b>${i + 1}</b><strong>${fmt(st.t)}</strong></div><p>${fmt(st.d)}</p>
        ${st.src ? `<div class="pic" style="--nw:${Math.max(st.w * 1.25, 480)}px">${img(st.src, st.w, st.h, st.t)}${(st.rings || []).map(([x, y]) => `<span class="ring" style="left:${x}%;top:${y}%"></span>`).join("")}${(st.boxes || []).map(([x, y, w, h]) => `<span class="hbox" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%"></span>`).join("")}</div>` : ""}</li>`).join("")}</ol>`,
      table: b => `${head(b)}<div class="tw"><table>${b.head ? `<tr>${b.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr>` : ""}${b.rows.map(r => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="k"' : ""}>${fmt(c)}</td>`).join("")}</tr>`).join("")}</table></div>`,
      steps: b => `${head(b)}<ol class="steps">${b.steps.map(s => `<li>${fmt(s)}</li>`).join("")}</ol>`,
      tips: b => `${head(b)}<ul class="tips">${b.items.map(s => `<li>${fmt(s)}</li>`).join("")}</ul>`,
      text: b => `${head(b)}${b.paras.map(p => `<p class="para">${fmt(p)}</p>`).join("")}`,
      split: b => `${head(b)}<div class="splitcols">${b.cols.map(c => `<div>${c.map(x => R[x.type](x)).join("")}</div>`).join("")}</div>`
    };

    function detail(id) {
      const P = page(id);
      const i = pageIds.indexOf(id), prev = pageIds[i - 1], next = pageIds[i + 1];
      const toc = P.blocks.filter(b => b.id && b.title).map(b => `<a href="#${b.id}">${esc(b.toc || b.title)}</a>`).join("");
      const nav = pageIds.map(p => `<a href="${pageFile(lang, p)}"${p === id ? ' class="on" aria-current="page"' : ""}>${ico(page(p).icon)}${esc(page(p).title)}</a>`).join("");
      return `
      <nav class="side"><a class="home" href="${homeFile(lang)}">← ${U.back}</a>${nav}</nav>
      <article>
        <div class="dhead">${ico(P.icon)}<h1>${esc(P.title)}</h1></div>
        <p class="dlead">${fmt(P.lead)}</p>
        ${toc ? `<div class="toc">${toc}</div>` : ""}
        ${P.blocks.map(b => `<section class="blk">${R[b.type](b)}</section>`).join("")}
        <div class="pn">${prev ? `<a href="${pageFile(lang, prev)}">← ${esc(page(prev).title)}</a>` : "<span></span>"}${next ? `<a href="${pageFile(lang, next)}">${esc(page(next).title)} →</a>` : ""}</div>
      </article>`;
    }

    const footer = () => `${esc(M.meta.title)} · ${esc(M.meta.appVersion)}${esc(U.versionSuffix)} · ${esc(U.updated)} ${esc(M.meta.updated)} · <a href="${esc(M.meta.productUrl)}">${esc(U.productPage || "AI Paint Cleaner")}</a> · <a href="/${lang === "ja" ? "index_j.html" : ""}">nekzuk Software</a>`;

    /* search index (used in the browser) */
    function searchIndex() {
      const idx = [];
      pageIds.forEach(id => {
        const P = page(id);
        idx.push({ label: P.title, sub: U.pageLabel, href: pageFile(lang, id), text: [P.title, P.summary, P.lead].join(" ") });
        P.blocks.forEach(b => {
          if (!b.title) return;
          const text = JSON.stringify(b).replace(/"(type|src|id|w|h|markers|a|b|w2|h2|pw|scale|maxw|color)":("[^"]*"|[\d.]+|\[[^\]]*\])/g, "");
          idx.push({ label: b.title, sub: P.title, href: b.id ? pageFile(lang, id) + "#" + b.id : pageFile(lang, id), text });
        });
      });
      M.tools.forEach(t => idx.push({ label: t.name, sub: U.mapTitle, href: homeFile(lang) + "#/map/" + t.id, text: [t.name, t.summary, ...t.items].join(" ") }));
      return idx;
    }

    return { esc, fmt, href, home, popover, detail, footer, searchIndex, pageIds, homeFile, pageFile };
  }

  const api = { create, homeFile, pageFile, sfx, esc };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ManualRender = api;
})(typeof window !== "undefined" ? window : globalThis);
