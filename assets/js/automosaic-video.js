(() => {
  'use strict';
  const en = document.documentElement.lang === 'en';
  const t = (ja, english) => en ? english : ja;
  const poster = document.querySelector('[data-youtube]');
  if (poster) {
    poster.setAttribute('aria-label', poster.dataset.playLabel);
    poster.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const iframe = document.createElement('iframe');
      iframe.title = poster.dataset.videoTitle;
      iframe.src = `https://www.youtube-nocookie.com/embed/${poster.dataset.youtube}?autoplay=1&rel=0&playsinline=1`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      poster.replaceWith(iframe);
      iframe.focus();
    });
  }


  // Start the looping sample video only when the play button is pressed.
  const sampleVideo = document.querySelector('.sample-video');
  const samplePlay = document.querySelector('.sample-video-play');
  if (sampleVideo && samplePlay) {
    sampleVideo.controls = false;
    samplePlay.hidden = false;
    samplePlay.addEventListener('click', () => {
      samplePlay.remove();
      sampleVideo.controls = true;
      sampleVideo.play();
      sampleVideo.focus({ preventScroll: true });
    });
  }

  const loadButton = document.querySelector('[data-gif]');
  if (!loadButton) return;
  const stage = document.querySelector('.gif-stage');
  const placeholder = document.querySelector('.gif-placeholder');
  const status = document.querySelector('.gif-status');
  const closeButton = document.querySelector('.gif-close');
  const initialLabel = loadButton.innerHTML;
  let activeImage = null;
  loadButton.hidden = false;

  function reset() {
    const image = activeImage;
    activeImage = null;
    if (image) {
      image.onload = null;
      image.onerror = null;
      image.removeAttribute('src');
      image.remove();
    }
    placeholder.hidden = false;
    loadButton.disabled = false;
    loadButton.innerHTML = initialLabel;
    loadButton.setAttribute('aria-expanded', 'false');
    stage.setAttribute('aria-busy', 'false');
    closeButton.hidden = true;
  }

  loadButton.addEventListener('click', () => {
    loadButton.disabled = true;
    loadButton.textContent = t("読み込み中…", "Loading\u2026");
    loadButton.setAttribute('aria-expanded', 'true');
    stage.setAttribute('aria-busy', 'true');
    closeButton.textContent = t("読み込みを中止 ×", "Cancel loading \u00d7");
    closeButton.hidden = false;
    status.textContent = t("GIFを読み込んでいます（約32MB）。", "Loading the GIF (about 32 MB).");
    const image = new Image();
    activeImage = image;
    image.className = 'gif-result';
    image.alt = t("移動する人物の顔と車のナンバープレートを塗りつぶした処理結果", "Moving faces and license plates covered with a solid fill");
    image.width = 1152;
    image.height = 648;
    image.hidden = true;
    image.onload = () => {
      if (activeImage !== image) return;
      const moveFocus = document.activeElement === loadButton;
      image.hidden = false;
      placeholder.hidden = true;
      stage.setAttribute('aria-busy', 'false');
      status.textContent = t("処理結果のアニメーションGIFを表示しています。", "The processed animation is now playing.");
      closeButton.textContent = t("表示を閉じる ×", "Hide animation \u00d7");
      if (moveFocus) closeButton.focus({ preventScroll: true });
    };
    image.onerror = () => {
      if (activeImage !== image) return;
      reset();
      status.textContent = t("読み込めませんでした。再度お試しいただくか、別タブでご覧ください。", "Unable to load. Try again or open the sample in a new tab.");
    };
    stage.append(image);
    image.src = loadButton.dataset.gif;
  });
  closeButton.addEventListener('click', () => {
    reset();
    status.textContent = t("クリックするとGIFを読み込みます。", "Click to load the GIF.");
    loadButton.focus({ preventScroll: true });
  });
})();
