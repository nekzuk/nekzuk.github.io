(() => {
  'use strict';
  document.querySelectorAll('[data-site-lang]').forEach((link) => {
    link.addEventListener('click', () => {
      try { localStorage.setItem('site_lang', link.dataset.siteLang); } catch (_) {}
    });
  });
})();
