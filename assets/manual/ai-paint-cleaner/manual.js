/* AI Paint Cleaner マニュアル — ブラウザでの動き（本文は build.js が HTML に書き出し済み） */
(() => {
  const M = window.MANUAL, U = M.ui;
  const V = ManualRender.create(M);
  const $ = (s, r = document) => r.querySelector(s);
  const app = $("#app");
  const PAGE = document.body.dataset.page || "home";

  /* old hash URLs (#/p/inpaint/diff) -> page files */
  if (/^#\/p\//.test(location.hash)) { location.replace(V.href(location.hash)); return; }

  /* protected e-mail: address is built only on click */
  document.addEventListener("click", e => {
    const a = e.target.closest("a.protected-email"); if (!a) return;
    e.preventDefault(); location.href = "mailto:" + a.dataset.emailUser + "@" + a.dataset.emailDomain;
  });

  /* keep the current section when switching language */
  document.querySelectorAll(".language-switch a[data-keep-hash]").forEach(a => a.addEventListener("click", () => { a.href = a.href.split("#")[0] + location.hash; }));

  /* ================= home: screen map popover ================= */
  function select(id, scroll) {
    const pop = $("#pop"), shot = $("#shot"); if (!pop) return;
    app.querySelectorAll(".rg").forEach(b => b.classList.toggle("on", b.dataset.id === id));
    const t = id && M.tools.find(x => x.id === id);
    if (!t) { pop.hidden = true; if (location.hash) history.replaceState(null, "", location.pathname); return; }
    history.replaceState(null, "", "#/map/" + id);
    pop.className = "pop g-" + t.group;
    pop.innerHTML = V.popover(t);
    pop.querySelector(".x").onclick = e => { e.stopPropagation(); select(null); };
    pop.hidden = false;
    const W = shot.clientWidth, H = shot.clientHeight;
    const [x, y, w, h] = t.region;
    const rx = x / 100 * W, ry = y / 100 * H, rw = w / 100 * W, rh = h / 100 * H;
    if (W < 760) { pop.style.cssText = ""; }
    else {
      const pw = pop.offsetWidth, ph = pop.offsetHeight;
      let left, top;
      if (t.group === "panel") {
        left = rx + rw + 12 + pw < W ? rx + rw + 12 : Math.max(8, rx - pw - 12);
        top = Math.min(Math.max(8, ry + 20), H - ph - 8);
      } else {
        left = Math.min(Math.max(8, rx + rw / 2 - pw / 2), W - pw - 8);
        top = ry + rh + 10;
      }
      pop.style.left = left + "px"; pop.style.top = Math.max(8, top) + "px";
    }
    if (scroll) shot.scrollIntoView({ block: "start" });
  }
  if (PAGE === "home") {
    app.querySelectorAll(".rg").forEach(b => b.onclick = e => { e.stopPropagation(); select(b.dataset.id); });
    $("#shot").addEventListener("click", e => { if (e.target.closest(".pop")) return; select(null); });
    const fromHash = () => { const m = location.hash.match(/^#\/map\/(.+)$/); if (m) requestAnimationFrame(() => select(m[1], true)); };
    addEventListener("hashchange", fromHash); fromHash();
    addEventListener("resize", () => { const on = app.querySelector(".rg.on"); on && select(on.dataset.id); });
  }

  /* ================= detail: marker <-> row highlight ================= */
  app.querySelectorAll("[data-fig]").forEach(fig => {
    const on = n => fig.querySelectorAll("[data-n]").forEach(e => e.classList.toggle("on", e.dataset.n === n));
    fig.querySelectorAll("[data-n]").forEach(e => { e.onmouseenter = () => on(e.dataset.n); e.onmouseleave = () => on(null); });
  });

  /* ================= lightbox ================= */
  const lb = document.createElement("div"); lb.className = "lb"; lb.hidden = true; document.body.appendChild(lb);
  lb.onclick = () => lb.hidden = true;
  addEventListener("keydown", e => { if (e.key === "Escape") { lb.hidden = true; select(null); } });
  app.addEventListener("click", e => {
    const im = e.target.closest("img[data-zoom]"); if (!im) return;
    const pair = im.closest(".pair");
    lb.innerHTML = pair ? `<div class="lbpair${pair.classList.contains("alpha") ? " alpha" : ""}">${[...pair.querySelectorAll("div")].map(d => `<figure><img src="${d.querySelector("img").src}" alt=""><figcaption>${d.querySelector("i").textContent}</figcaption></figure>`).join("")}</div>` : `<img src="${im.src}" alt="">`;
    lb.hidden = false;
  });

  /* ================= search ================= */
  const idx = V.searchIndex();
  const q = $("#q"), res = $("#res");
  q.placeholder = U.search;
  let hits = [];
  q.addEventListener("input", () => {
    const v = q.value.trim().toLowerCase();
    if (!v) { res.hidden = true; return; }
    const terms = v.split(/\s+/);
    hits = idx.filter(e => terms.every(t => (e.label + " " + e.text).toLowerCase().includes(t)))
      .sort((a, b) => (b.label.toLowerCase().includes(terms[0]) - a.label.toLowerCase().includes(terms[0]))).slice(0, 10);
    res.innerHTML = hits.length ? hits.map(h => `<a href="${h.href}"><b>${V.esc(h.label)}</b><span>${V.esc(h.sub)}</span></a>`).join("") : `<p>${U.noResult}</p>`;
    res.hidden = false;
  });
  q.addEventListener("keydown", e => { if (e.key === "Enter" && hits[0]) { location.href = hits[0].href; res.hidden = true; q.blur(); } });
  res.addEventListener("click", () => { res.hidden = true; q.value = ""; });
  document.addEventListener("click", e => { if (!e.target.closest(".search")) res.hidden = true; });
})();
