(() => {
  'use strict';

  // Match site-theme.css. A manual choice lasts only for this page visit.
  const lightScheme = window.matchMedia('(prefers-color-scheme: light)');

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
      if (!manuallySelected) showTheme(lightScheme.matches ? 'light' : 'dark');
    });

    showTheme(lightScheme.matches ? 'light' : 'dark');
    controls.hidden = false;
  });
})();
