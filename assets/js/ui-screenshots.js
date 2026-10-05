(() => {
  'use strict';

  // Follow the page theme until the visitor explicitly selects a screenshot.
  const lightScheme = window.matchMedia('(prefers-color-scheme: light)');

  const pageTheme = () => document.documentElement.dataset.siteTheme || (lightScheme.matches ? 'light' : 'dark');

  document.querySelectorAll('.ui-preview').forEach((preview) => {
    const controls = preview.querySelector('.ui-theme-controls');
    const buttons = preview.querySelectorAll('[data-ui-theme-choice]');
    let manuallySelected = false;

    function showTheme(theme) {
      preview.dataset.uiTheme = theme;
      buttons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.uiThemeChoice === theme));
      });
    }

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        manuallySelected = true;
        showTheme(button.dataset.uiThemeChoice);
      });
    });

    lightScheme.addEventListener('change', () => {
      if (!manuallySelected) showTheme(pageTheme());
    });

    window.addEventListener('site-theme-change', () => {
      if (!manuallySelected) showTheme(pageTheme());
    });

    showTheme(pageTheme());
    controls.hidden = false;
  });
})();
