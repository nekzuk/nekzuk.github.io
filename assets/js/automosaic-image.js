(() => {
  'use strict';
  const root = document.documentElement;
  function setupSwitcher(buttonSelector, panelSelector, buttonKey, panelKey, initial) {
    const buttons = Array.from(document.querySelectorAll(buttonSelector));
    const panels = Array.from(document.querySelectorAll(panelSelector));
    if (!buttons.length || !panels.length) return;
    function select(value) {
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset[buttonKey] === value)));
      panels.forEach(panel => { panel.hidden = panel.dataset[panelKey] !== value; });
    }
    buttons.forEach(button => button.addEventListener('click', () => select(button.dataset[buttonKey])));
    // Pages other than AutoMosaic use their own sample names; fall back to the first tab.
    select(buttons.some(button => button.dataset[buttonKey] === initial) ? initial : buttons[0].dataset[buttonKey]);
    buttons[0].parentElement.hidden = false;
  }
  setupSwitcher('[data-sample]', '[data-sample-panel]', 'sample', 'samplePanel', 'people');
  setupSwitcher('[data-ui]', '[data-ui-panel]', 'ui', 'uiPanel', 'light');
  root.classList.add('enhanced');

  const dialog = document.querySelector('.image-dialog');
  const dialogImage = dialog.querySelector('img');
  let previousOverflow = '';
  if (typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-zoom]').forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        dialogImage.src = link.href;
        dialogImage.alt = link.querySelector('img').alt;
        document.getElementById('image-dialog-title').textContent = link.dataset.zoomTitle;
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        dialog.showModal();
      });
    });
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => { document.body.style.overflow = previousOverflow; });
  }
})();
