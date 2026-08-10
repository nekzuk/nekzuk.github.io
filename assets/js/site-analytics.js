(function () {
  "use strict";

  if (window.__nekzukSiteAnalyticsInstalled) {
    return;
  }
  window.__nekzukSiteAnalyticsInstalled = true;

  var productSlugs = new Set([
    "automosaic-r18",
    "automosaic",
    "automosaic-video-r18",
    "automosaic-video",
    "ai-paint-cleaner",
    "nai-smart-studio",
    "ai-meta-cleaner",
    "frame-craft",
    "meta-converter",
  ]);

  function productFromPath(pathname) {
    var filename = decodeURIComponent(pathname.split("/").pop() || "")
      .replace(/_j(?=\.html$)/, "")
      .replace(/\.html$/, "");
    return productSlugs.has(filename) ? filename : "";
  }

  var pageProduct = productFromPath(window.location.pathname);

  function productFromContainer(link) {
    var selectors = [".mini-actions", ".product-card", ".usecase-card"];
    for (var i = 0; i < selectors.length; i += 1) {
      var container = link.closest(selectors[i]);
      if (!container) {
        continue;
      }
      var candidates = container.querySelectorAll("a[href]");
      for (var j = 0; j < candidates.length; j += 1) {
        try {
          var candidateUrl = new URL(candidates[j].href, window.location.href);
          var product = productFromPath(candidateUrl.pathname);
          if (product) {
            return product;
          }
        } catch (error) {}
      }
    }
    return "";
  }

  function classifyLink(url) {
    var hostname = url.hostname.toLowerCase();

    if (
      hostname === "downloads.nekzuk.com" &&
      /\.zip$/i.test(url.pathname)
    ) {
      return { eventName: "trial_download_click", channel: "direct" };
    }

    if (hostname.endsWith("payhip.com") && url.pathname === "/buy") {
      return { eventName: "checkout_click", channel: "payhip" };
    }

    if (
      hostname.endsWith("booth.pm") &&
      /^\/items\/\d+/.test(url.pathname)
    ) {
      return { eventName: "store_product_click", channel: "booth" };
    }

    if (hostname.endsWith("payhip.com") && /^\/b\//.test(url.pathname)) {
      return { eventName: "store_product_click", channel: "payhip" };
    }

    var targetProduct = productFromPath(url.pathname);
    if (
      url.origin === window.location.origin &&
      targetProduct &&
      targetProduct !== pageProduct
    ) {
      return { eventName: "product_detail_click", channel: "official_site" };
    }

    if (hostname === "note.com" && url.pathname.startsWith("/nekzuk/")) {
      return { eventName: "note_article_click", channel: "note" };
    }

    return null;
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || typeof target.closest !== "function") {
      return;
    }

    var link = target.closest("a[href]");
    if (!link || typeof window.gtag !== "function") {
      return;
    }

    var url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (error) {
      return;
    }

    var classification = classifyLink(url);
    if (!classification) {
      return;
    }

    var targetProduct = productFromPath(url.pathname);
    var product = targetProduct || pageProduct || productFromContainer(link) || "site";
    var language = (
      document.documentElement.lang ||
      (window.location.pathname.includes("_j.html") ? "ja" : "en")
    )
      .toLowerCase()
      .split("-")[0];

    window.gtag("event", classification.eventName, {
      product: product,
      channel: classification.channel,
      language: language,
      link_url: url.href,
      link_text: (link.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100),
      page_path: window.location.pathname,
      transport_type: "beacon",
    });
  });
})();
