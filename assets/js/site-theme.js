(() => {
  'use strict';

  const root = document.documentElement;
  const storageKey = 'site_theme';
  const lightScheme = window.matchMedia('(prefers-color-scheme: light)');
  const lightStyles = document.querySelectorAll('[data-site-light]');
  const isTheme = (value) => value === 'light' || value === 'dark';
  let buttons = [];

  function readPreference() {
    try {
      const value = localStorage.getItem(storageKey);
      return isTheme(value) ? value : null;
    } catch (_) {
      return null;
    }
  }

  let preference = readPreference();

  function applyTheme() {
    const theme = preference || (lightScheme.matches ? 'light' : 'dark');
    root.dataset.siteTheme = theme;
    root.style.colorScheme = theme;
    lightStyles.forEach((sheet) => { sheet.media = theme === 'light' ? 'all' : 'not all'; });
    const next = theme === 'light' ? 'dark' : 'light';
    const label = root.lang === 'ja'
      ? (theme === 'light' ? '現在：ライト／ダークに切り替える' : '現在：ダーク／ライトに切り替える')
      : `Currently ${theme}; switch to ${next} theme`;
    buttons.forEach((button) => {
      button.setAttribute('aria-label', label);
      button.title = label;
    });
    window.dispatchEvent(new CustomEvent('site-theme-change', { detail: { theme } }));
  }

  // Runs in the head before body rendering, including on subsequent page visits.
  applyTheme();

  function initializeControls() {
    buttons = document.querySelectorAll('.site-theme-toggle');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        preference = root.dataset.siteTheme === 'light' ? 'dark' : 'light';
        try { localStorage.setItem(storageKey, preference); } catch (_) { /* Keep this visit usable. */ }
        applyTheme();
      });
      button.hidden = false;
    });
    applyTheme();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeControls, { once: true });
  } else {
    initializeControls();
  }

  lightScheme.addEventListener('change', () => {
    if (!preference) applyTheme();
  });
  window.addEventListener('storage', (event) => {
    if (event.key !== storageKey && event.key !== null) return;
    try { if (event.storageArea !== localStorage) return; } catch (_) { return; }
    preference = readPreference();
    applyTheme();
  });
})();
