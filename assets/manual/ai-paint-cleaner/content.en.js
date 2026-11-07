/*
 * AI Paint Cleaner online manual — English content
 * ------------------------------------------------------------
 * Same structure as content.ja.js (ids, page keys and anchors must match so the
 * language switch keeps the current page). Only text, image paths and marker
 * positions differ.
 *  region  : box on the screen map [left%, top%, width%, height%]
 *  markers : strip = array of left%, figure = array of [left%, top%]; number = row order
 *  **bold** and key names (Ctrl / Shift / F1 ...) are styled automatically
 */
window.MANUAL = {
  lang: "en",
  meta: { title: "AI Paint Cleaner Manual", appVersion: "v3.40", updated: "2026-11-04", productUrl: "/ai-paint-cleaner.html" },

  ui: {
    search: "Search features and keywords", versionSuffix: "", updated: "Last updated",
    heroLead: "Open an image, mark an area, process it, and save. Mosaic, object removal, background removal and tagging — all in one window.",
    mapTitle: "Screen map", mapLead: "Click a box on the screen to see what that area does.",
    pagesTitle: "Browse by feature", controlsTitle: "Basic controls", controlsLead: "Hover over any button to see its tooltip. Press F1 to label every frame and F2 to show the shortcut list.",
    allShortcuts: "All shortcuts", faqTitle: "Troubleshooting", detail: "Learn more", back: "Back to top",
    mouse: "Mouse", keyboard: "Keyboard", action: "Action", noResult: "No results", pageLabel: "Page",
    productPage: "Product page", before: "Before", after: "After"
  },

  automosaic: {
    title: "Use with AutoMosaic",
    text: "Review and touch up images processed by AutoMosaic. Check the mosaic areas in the preview, and remove unwanted mosaics just by tracing them with a right-click.",
    links: [["Open processed images (auto preview and diff source)", "#/p/mosaic/am-open"], ["Remove unwanted mosaics", "#/p/mosaic/am-remove"]]
  },

  groups: { file: "File / view", edit: "Drawing tools", sub: "Sub-tools", panel: "Panels" },

  quickstart: [
    { t: "Open an image", d: "Top-left button, Ctrl+O, or drag & drop." },
    { t: "Pick a tool", d: "Choose the frame for the job: mosaic, repair/remove, background removal, and so on." },
    { t: "Mark the area and run", d: "Drag on the image to mark the area, then press Enter or ▶." },
    { t: "Save", d: "Ctrl+S to overwrite, Ctrl+Shift+S to save as a new file." }
  ],

  /* ================= Screen map ================= */
  screen: { src: "images/screen-en.webp", w: 2000, h: 1194 },

  tools: [
    { id: "file", group: "file", name: "File Tools", icon: "open.png", region: [0.3, 2.9, 8.9, 2.5], page: "basics", anchor: "file",
      summary: "Open, save and settings.", items: ["Open (Ctrl+O / drag & drop)", "Undo (Ctrl+Z) / Redo (Ctrl+Y)", "Save (Ctrl+S) / Save As (Ctrl+Shift+S)", "Settings"] },
    { id: "page", group: "file", name: "Page Operations", icon: "next.png", region: [9.4, 2.9, 11.7, 2.5], page: "basics", anchor: "file",
      summary: "Move between images in the folder.", items: ["Previous / next image (← →, mouse back / forward buttons)", "Move image to trash (Delete)", "Image grid (Ctrl+L) / bottom thumbnail bar", "Type a number to jump to that image"] },
    { id: "info", group: "file", name: "Image Information", icon: null, region: [21.3, 2.9, 58.6, 2.5], page: "basics", anchor: "info",
      summary: "File name, image size and zoom.", items: ["File name (full path can be enabled in Settings)", "Image size", "Zoom (type a value to change it)"] },
    { id: "convert", group: "sub", name: "Format Conversion", icon: "convert.png", region: [80.1, 2.9, 9.0, 2.5], page: "resize", anchor: "convert",
      summary: "Convert to PNG / JPG / WebP / PDF, or compress.", items: ["Choose format and color mode (RGB / RGBA)", "Folder batch toggle", "Convert button"] },
    { id: "bookmark", group: "sub", name: "Sorting & Bookmarks", icon: "folder1.png", region: [89.3, 2.9, 10.4, 2.5], page: "organize", anchor: "bookmark",
      summary: "Sort images into folders or open them in other apps.", items: ["Keys 1–5 move / copy to registered folders", "Ctrl+1–5 opens a registered folder", "Register an EXE to open the image in that app"] },

    { id: "mosaic", group: "edit", name: "Mosaic Tools", icon: "mosaic_rect.png", region: [0.3, 5.7, 46.4, 2.7], page: "mosaic",
      summary: "Mosaic, blur or solid fill over the traced area.", items: ["Rectangle / bar / pen", "AI auto-select (Shift+left click)", "Size: presets, Auto (1/100 of the long side) or slider", "Trace with right-click to restore (diff replacement)"] },
    { id: "metadata", group: "sub", name: "Metadata Tools", icon: "metaclean.png", region: [46.8, 5.7, 11.3, 2.7], page: "metadata",
      summary: "Check and remove generation metadata.", items: ["Shows whether metadata is present", "Toggle to also remove embedded data", "Remove button / details sidebar"] },
    { id: "tagger", group: "sub", name: "Tag / Caption", icon: "tagger1.png", region: [58.2, 5.7, 31.8, 2.7], page: "tagger",
      summary: "Generate tags or an English caption from the image.", items: ["Switch between Tags and Caption", "Output: Clipboard / TXT file / Embed in image", "Bulk tag editor"] },

    { id: "inpaint", group: "edit", name: "Inpainting Tools", icon: "mask.png", region: [0.3, 8.65, 31.5, 2.65], page: "inpaint",
      summary: "Erase, redraw or restore the masked area.", items: ["Repair / remove (LaMa, Moebius, ...)", "Inpaint (SDXL / NovelAI / GPT / Gemini)", "Diff replacement and others (background removal, mosaic, erase)"] },
    { id: "resize", group: "sub", name: "Resize & Upscale", icon: "resize.png", region: [32.0, 8.65, 24.2, 2.65], page: "resize",
      summary: "Resize and AI upscaling.", items: ["Fixed size / % / long side", "Lock aspect ratio", "Standard Resize or AI upscalers"] },
    { id: "color", group: "sub", name: "Manual Color Adjustment", icon: "manualcoloradjust.png", region: [56.45, 8.65, 1.6, 2.65], page: "color", anchor: "manual",
      summary: "Adjust brightness and color with sliders.", items: ["Basic, RGB, advanced and tone mapping", "Save presets"] },
    { id: "aicorrect", group: "sub", name: "AI Correction", icon: "ai_correction_run.png", region: [58.2, 8.65, 27.9, 2.65], page: "color", anchor: "ai",
      summary: "AI correction for color, brightness, noise, blur and more.", items: ["Choose a category and a preset", "Strength (-200 to 200)", "Folder batch supported"] },

    { id: "paint", group: "edit", name: "Paint Tools", icon: "pen.png", region: [0.3, 11.5, 20.2, 2.75], page: "paint",
      summary: "Pen, fill and eyedropper.", items: ["Pick a color from the palette", "Pen (size) / fill (tolerance)", "Eyedropper"] },
    { id: "eraser", group: "edit", name: "Eraser", icon: "eraser.png", region: [20.7, 11.5, 8.4, 2.75], page: "paint",
      summary: "Erase the traced area.", items: ["Left click to erase", "Right click + wheel to change size"] },
    { id: "text", group: "edit", name: "Text", icon: "text.png", region: [29.3, 11.5, 1.7, 2.75], page: "paint", anchor: "text",
      summary: "Place text and speech bubbles.", items: ["Set text, font, vertical writing etc. in the right sidebar", "Left click to place; right click / Enter to apply"] },
    { id: "select", group: "edit", name: "Selection Tools", icon: "rectangular_select.png", region: [31.1, 11.5, 8.9, 2.75], page: "paint", anchor: "select",
      summary: "Select an area to move, copy, crop or transform.", items: ["Rectangle / free selection", "Move / copy toggle", "Crop, background processing, delete / expand strips", "Flip and rotate 90°"] },
    { id: "bgremove", group: "sub", name: "Background Removal", icon: "bg_remove.png", region: [40.2, 11.5, 16.0, 2.75], page: "bgremove",
      summary: "Make the background transparent, white, blurred or a set color.", items: ["Choose a model (BiRef-D, ...)", "Background type and threshold", "Folder batch supported"] },
    { id: "insert", group: "sub", name: "Image Insert", icon: "image_insert.png", region: [56.45, 11.5, 1.6, 2.75], page: "paint", anchor: "insert",
      summary: "Insert speech bubbles and other assets.", items: ["Assets in the image folder are listed in the sidebar", "Double-click to insert"] },
    { id: "watermark", group: "sub", name: "Watermark", icon: "watermark.png", region: [58.2, 11.5, 1.6, 2.75], page: "paint", anchor: "watermark",
      summary: "Add a text or image watermark.", items: ["Position, transparency, rotation, tiling", "Apply to all images in the folder"] },
    { id: "organize", group: "sub", name: "Organize Files", icon: null, region: [59.96, 11.5, 3.2, 2.75], page: "organize", anchor: "rename",
      summary: "Rename files and find duplicate / similar images.", items: ["Rename images together with their tag .txt files", "Compare duplicates / similar images and move them to trash"] },

    { id: "sidebar", group: "panel", name: "Inpaint settings", icon: null, region: [0.3, 15.6, 18.1, 81.0], page: "inpaint", anchor: "external",
      summary: "Settings for the selected inpaint model.", items: ["Prompt and reference images", "Model and generation settings", "API key (external services)", "Generate"] },
    { id: "canvas", group: "panel", name: "Canvas", icon: null, region: [19.3, 15.05, 53.3, 70.0], page: "basics",
      summary: "Image view and drawing area.", items: ["Wheel: zoom", "Middle-drag / Space+left-drag: pan", "Alt+0: fit, Ctrl+0: 100%"] },
    { id: "thumbbar", group: "panel", name: "Thumbnail bar", icon: null, region: [19.3, 85.4, 53.3, 11.3], page: "basics", anchor: "file",
      summary: "Shows the images in the folder along the bottom.", items: ["Click to switch to that image", "Show / hide with the Page Operations button"] },
    { id: "metaview", group: "panel", name: "Metadata Details", icon: null, region: [73.1, 14.7, 26.8, 81.9], page: "metadata", anchor: "sidebar",
      summary: "Shows the prompt and parameters of generated images.", items: ["Detects the AI type (SD / ComfyUI / NovelAI)", "Prompt, negative prompt, all parameters", "Copy, edit and save"] },
    { id: "help", group: "file", name: "Help", icon: null, region: [86.0, 97.4, 13.9, 2.4], page: "basics", anchor: "shortcuts",
      summary: "Frame labels and shortcut list.", items: ["? or F1: show frame labels", "S or F2: shortcut list"] }
  ],

  controls: [
    ["Draw / select", "Left click", ""],
    ["Zoom", "Wheel", ""],
    ["Pan", "Middle-drag", "Space＋left-drag"],
    ["Previous / next image", "Back / forward buttons", "← / →"],
    ["Switch tool", "Right click＋back / forward", "↑ / ↓"],
    ["Switch inpaint category", "Left click＋back / forward", "Ctrl＋↑ / ↓"],
    ["Change tool size", "Right click＋wheel", ""],
    ["Fit / 100%", "", "Alt＋0 / Ctrl＋0"],
    ["Show image grid", "", "Ctrl＋L"],
    ["Open / save", "Drag & drop", "Ctrl＋O / Ctrl＋S"],
    ["Undo / redo", "", "Ctrl＋Z / Ctrl＋Y"]
  ],

  faq: [
    { q: "The first run takes a long time", a: "Background removal, AI correction, tag / caption generation and inpainting download their models the first time you use them. Later runs are faster." },
    { q: "The GPU is not used / an error appears", a: "Update your GPU driver. Only NVIDIA GPUs are supported. You can check the processing device in Settings." },
    { q: "Diff replacement picks the wrong image", a: "Change how the reference is chosen to suit your purpose (Ctrl+R opens the dialog).", link: "inpaint/diff" },
    { q: "I want to stop the confirmation when deleting or sorting", a: "Turn on \"Skip confirmation when deleting or sorting images\" in Settings." },
    { q: "External services (GPT / Gemini / NovelAI) don't work", a: "Each service needs its own API key. Use \"API key setup\" in the sidebar to get one and register it. Charges depend on each service's plan and usage.", link: "inpaint/external" },
    { q: "I found a bug", a: "Please let us know via [BOOTH messages](https://accounts.booth.pm/conversations/49131834/messages), [Payhip messages](https://payhip.com/nekzuk/contact), [email](email), or the [bug report form](https://docs.google.com/forms/d/e/1FAIpQLSdeWbRrfUgabl-psitJtypI7XDpYYFIJYbbMPJdaNmFYYaL0A/viewform?usp=dialog). Steps to reproduce and a screenshot help us fix it faster." }
  ],

  /* ================= Pages ================= */
  pages: {
    /* ---------- Basics ---------- */
    basics: {
      title: "Screen & basics", icon: "open.png",
      summary: "Open, save, switch images, image grid, settings and shortcuts.",
      lead: "Operations shared by every feature: opening and saving images, moving between images in a folder, and the main settings.",
      blocks: [
        { type: "strip", id: "file", title: "File tools and page operations", src: "images/ui/file-en.webp", w: 536, h: 41, scale: 1.5,
          markers: [3.9, 10.4, 17.2, 24.6, 31.5, 38.6, 47.4, 54.1, 61.4, 68.3, 75.4, 86.6],
          rows: [
            ["Open", "Opens an image (Ctrl+O). Drag & drop also works."],
            ["Undo", "Undoes the last operation (Ctrl+Z)."],
            ["Redo", "Redoes an undone operation (Ctrl+Y)."],
            ["Save", "Ctrl+S. A confirmation before overwriting can be enabled in Settings."],
            ["Save As", "Ctrl+Shift+S. The suffix added to the file name can be changed in Settings."],
            ["Settings", "Opens display, save, processing and other settings."],
            ["Previous image", "← or the mouse back button."],
            ["Next image", "→ or the mouse forward button."],
            ["Delete image", "Moves the current image to the trash (Delete)."],
            ["Image grid", "Shows the images in the folder as a grid (Ctrl+L)."],
            ["Thumbnail bar", "Shows thumbnails below the canvas."],
            ["Image number", "Type a number and press Enter to jump to that image."]
          ] },
        { type: "strip", id: "info", title: "Image information", src: "images/ui/info-en.webp", w: 1504, h: 41, scale: 0.9,
          markers: [30, 89.8, 96.9],
          rows: [
            ["File name", "Name of the open image. Full path display can be enabled in Settings."],
            ["Image size", "Width × height (px)."],
            ["Zoom", "Canvas zoom (%). Type a value to change it."]
          ] },
        { type: "gallery", id: "views", title: "Thumbnail bar and image grid", items: [
          { title: "Thumbnail bar", sub: "Below the canvas", src: "images/ui/thumbnail-en.webp", w: 1600, h: 955, note: "Click a thumbnail to switch images. Close it with the × at the top right." },
          { title: "Image grid", sub: "Ctrl+L", src: "images/ui/all-thumbnail-en.webp", w: 1600, h: 955, note: "Left click to select, Ctrl / Shift for multiple, Enter / double-click to open, Delete to trash, Esc to go back. The slider at the top right changes the thumbnail size." }
        ] },
        { type: "tips", items: [
          "Turn on \"Show folder tree in grid view\" in Settings to show a folder tree to the left of the grid (double-click to move).",
          "Right-click in the grid to select all, invert the selection, copy paths, or move the selection to the trash."
        ] },
        { type: "table", id: "settings", title: "Main settings", lead: "Open with the gear button at the top left.", head: ["Group", "Main items"], rows: [
          ["Display", "Language, appearance (light / dark), full path display, original-size display, show / hide tools, highlight the active tool"],
          ["Save", "JPEG / WebP quality, PNG compression level, PDF creation, Save As suffix, overwrite confirmation, auto-save when switching images"],
          ["Drawing", "Mask opacity, mosaic size presets / edge blur / right-click diff replacement, transparency colors, pen tablet stability"],
          ["Processing", "Processing device, GPU model retention, LaMa processing area, AI auto mask (SAM2), diff replacement reference method"],
          ["Models", "Show / hide inpaint models, background removal models and AI correction presets; tag / caption model storage location"],
          ["Shortcuts", "Change keyboard shortcuts (mouse controls are fixed)"],
          ["Other", "Update check at startup, start maximized, skip confirmations, Eagle integration, logging"]
        ] },
        { type: "table", id: "shortcuts", title: "Shortcut list", lead: "Keyboard shortcuts can be changed under Settings > Shortcuts. These are the defaults.", head: ["Action", "Key / mouse", "When"], rows: [
          ["Open / Save / Save As", "Ctrl+O / Ctrl+S / Ctrl+Shift+S", ""],
          ["Undo / redo", "Ctrl+Z / Ctrl+Y", ""],
          ["Previous / next image", "← / →, back / forward buttons", ""],
          ["Delete image", "Delete", ""],
          ["Show / hide image grid", "Ctrl+L", ""],
          ["Move / copy to sorting folder", "1–5", "When sorting folders are set"],
          ["Open sorting folder", "Ctrl+1–5", "When sorting folders are set"],
          ["Switch tool", "↑ / ↓, right click＋back / forward", ""],
          ["Fit / 100%", "Alt+0 / Ctrl+0", ""],
          ["Copy / paste / cut", "Ctrl+C / Ctrl+V / Ctrl+X", "With a selection"],
          ["Delete vertical / horizontal strip", "Ctrl+Alt+V / Ctrl+Alt+H", "With a selection"],
          ["Expand vertical / horizontal strip", "Ctrl+Shift+V / Ctrl+Shift+H", "With a selection"],
          ["Switch inpaint category", "Ctrl+↑ / ↓, left click＋back / forward", "Mask tool selected"],
          ["Switch model within category", "Ctrl+Shift+↑ / ↓", "Mask tool selected"],
          ["Grow / shrink mask area", "Shift＋wheel", "Cursor over a mask"],
          ["Add / remove mask with AI select", "Shift＋left click / Shift＋right click", "AI auto mask on"],
          ["Mosaic size down / up", ", / .", "Mosaic tools"],
          ["Mosaic size preset", "Shift+, / Shift+.", "Mosaic tools"],
          ["Mosaic type", "M / Shift+M", "Mosaic tools"],
          ["Show diff replacement reference", "Alt+R (while held)", "Diff replacement / mosaic tools"],
          ["Diff replacement reference settings", "Ctrl+R", "Diff replacement / mosaic tools"],
          ["Show AutoMosaic preview image", "Alt+P (while held)", "While a preview is shown"],
          ["Frame labels / shortcut list", "F1 / F2", ""]
        ] }
      ]
    },

    /* ---------- Mosaic ---------- */
    mosaic: {
      title: "Mosaic", icon: "mosaic_rect.png",
      summary: "Mosaic / blur / solid. Preview AutoMosaic results and remove unwanted mosaics.",
      lead: "A dedicated tool that applies mosaic, blur or a solid color to the traced area. Tracing with a right-click restores the original pixels (diff replacement), which makes it ideal for finishing images processed by AutoMosaic.",
      blocks: [
        { type: "strip", id: "toolbar", title: "Toolbar", src: "images/ui/mosaic-en.webp", w: 1191, h: 43, scale: 1.1,
          markers: [1.8, 4.8, 7.9, 11.3, 23.0, 41.9, 65.8, 75.5, 90.2],
          rows: [
            ["Mosaic rectangle", "Applies to the rectangle you drag with the left button. Trace with a right-click to restore."],
            ["Mosaic bar", "Applies to the band you drag with the left button. Trace with a right-click to restore. Width: right click + wheel."],
            ["Mosaic pen", "Applies to the area you trace with the left button. Drawing a closed loop fills the inside too. Trace with a right-click to restore."],
            ["AI auto-select", "When on, Shift+left click lets the AI pick the object and applies the mosaic to it."],
            ["Pen / bar size", "Mosaic pen thickness and mosaic bar width (right click + wheel)."],
            ["Type", "Mosaic / Blur / Solid (switch with M / Shift+M)."],
            ["Size presets", "Frequently used mosaic sizes. Values can be set from 1–99 px in Settings (Shift+, / Shift+.)."],
            ["Auto", "Uses 1/100 of the image's long side as the mosaic size."],
            ["Size", "Fine-tunes the mosaic size (, / .)."]
          ], note: "Right-click restore (diff replacement) and filling closed loops are on by default. You can turn them off under Settings > Drawing." },
        { type: "table", id: "kinds", title: "Mosaic types", head: ["Type", "Description"], rows: [
          ["Mosaic", "Standard pixelation. Edge blur can be turned on or off in Settings."],
          ["Blur", "Applies a Gaussian blur."],
          ["Solid", "Fills with the palette color. Choose \"Full\" or \"Outline\" in Settings and set the outline width."]
        ] },
        { type: "cards", id: "automosaic", title: "Working with AutoMosaic", lead: "When you open an image processed by AutoMosaic, these two features are ready automatically.", groups: [
          { title: "① Open processed images", tag: "Auto preview and diff source", color: "#2f7fd1",
            desc: "Just open an AutoMosaic output image: the mosaic areas appear as a preview in the right sidebar, and the original (pre-mosaic) image is set as the diff replacement reference.", link: "mosaic/am-open" },
          { title: "② Remove unwanted mosaics", tag: "Just trace with a right-click", color: "#d6457a",
            desc: "Because the reference is already set, tracing an unwanted mosaic restores the original pixels. Use right-click with the mosaic tools, or the \"Diff Replace\" category in the inpainting tools.", link: "mosaic/am-remove" }
        ] },
        { type: "flow", id: "am-open", title: "① Open AutoMosaic output images", steps: [
          { t: "Turn on \"Save Final Preview Image\" in AutoMosaic", d: "Enable it in AutoMosaic's option settings before processing. A Preview folder is created in the output location.",
            src: "images/ui/am-option-en.webp", w: 590, h: 164, rings: [[5.3, 51.5]] },
          { t: "Open the output images in AI Paint Cleaner", d: "Open the processed images located next to the Preview folder. Use ← → to go through them one by one.",
            src: "images/ui/am-files.webp", w: 352, h: 184, boxes: [[0.5, 18, 58, 81]] },
          { t: "Preview and diff source appear automatically", d: "The right sidebar shows a preview of the mosaic areas and the name of the original image used for diff replacement. Hold Alt+P to show the preview on the canvas.",
            src: "images/ui/am-preview-en.webp", w: 1802, h: 1035, boxes: [[64.1, 3.8, 35.8, 62.2], [64.1, 66.3, 35.8, 14.4]] }
        ] },
        { type: "figure", id: "am-remove", title: "② Remove unwanted AutoMosaic mosaics", stack: true, src: "images/ex/am-remove-en.webp", w: 1800, h: 731, pw: 1100,
          markers: [[3.2, 9.0], [39.6, 76.6], [20.0, 46.9], [65.7, 75.6]],
          rows: [
            ["Mosaic tools", "Select a mosaic tool. Tracing with a right-click performs diff replacement (restore). The \"Diff Replace\" category in the inpainting tools does the same."],
            ["Diff replacement source image", "The original image is set automatically from the AutoMosaic log. If it's the wrong image, change it with Ctrl+R."],
            ["Trace with a right-click", "Roughly trace the mosaic you want to remove with a right-click."],
            ["Restored", "Only the traced area returns to the original pixels and the mosaic disappears. Add any missing mosaics by left-dragging."]
          ], note: "Hold Alt+R to show the reference image on the canvas and check it." },
        { type: "tips", items: [
          "Turn the automatic preview on or off with \"Auto-show AutoMosaic Preview images\", and the automatic source with \"Automatically set source image from AutoMosaic log\" in Settings."
        ] }
      ]
    },

    /* ---------- Inpainting ---------- */
    inpaint: {
      title: "Inpainting", icon: "mask.png",
      summary: "Erase, redraw or restore the masked area — from lightweight removal to generative AI and external services.",
      lead: "Applies processing to the area you paint with the mask. Which category you use depends on whether you want to erase (Repair/Remove), redraw (Inpaint) or restore (Diff Replace).",
      blocks: [
        { type: "strip", id: "toolbar", title: "Toolbar", src: "images/ui/inpaint-en.webp", w: 811, h: 42, scale: 1.5,
          markers: [2.6, 7.0, 19.6, 48.0, 73.2, 92.4, 97.3],
          rows: [
            ["Mask tool", "Left-drag to paint the area, right-drag to erase. Shift+wheel over the mask grows / shrinks it."],
            ["AI auto mask", "When on, Shift+left click lets the AI pick the object as a mask (Shift+right click to exclude)."],
            ["Category", "Repair/Remove / Inpaint / Diff Replace / Other (Ctrl+↑↓)."],
            ["Model", "Model within the category (Ctrl+Shift+↑↓). Direct keys can be assigned to favorite models in Settings."],
            ["Size", "Mask brush size (right click + wheel)."],
            ["Run", "Processes the masked area (Enter / double-click)."],
            ["Clear mask", "Clears all painted masks."]
          ] },
        { type: "cards", id: "categories", title: "Choosing a category and model", groups: [
          { title: "Repair/Remove", tag: "No prompt, a few seconds", color: "#2f9e6e", desc: "Erases unwanted objects by blending them with the surroundings. If the result isn't good, try another model.",
            items: [["Remove (LaMa)", "Large areas: buildings, signs, sky and horizon"], ["Remove (MIGAN)", "Fastest. Complex backgrounds and fine detail"], ["Remove (MGA)", "Textures such as plants, clouds, water, fabric"], ["Remove (FcF)", "Patterns like wallpaper or floors, straight structures"], ["Repair (PatchMatch)", "Fills from similar nearby patterns. Small objects, thin scratches"], ["Repair (OpenCV Telea)", "Fast non-AI repair. Small scratches, dust, thin lines"], ["Completion (Moebius)", "Generates background to fill. People and complex backgrounds (NVIDIA GPU required, ~1 GB first download)"]] },
          { title: "Inpaint", tag: "Redraw with a prompt", color: "#d6457a", desc: "Set the prompt and reference images in the left sidebar.",
            items: [["Advanced Inpaint (SDXL)", "Redraws according to the prompt. GPU required, about 10–60 s"], ["Reference Inpaint (SDXL)", "Redraws while keeping the composition and style of the original (or a reference image)"], ["NovelAI Inpaint", "Redraws the masked area with NovelAI (NovelAI subscription required)"], ["GPT/Gemini Inpaint", "Edit with natural language. Without a mask, the whole image is edited"]] },
          { title: "Diff Replace", tag: "Restore", color: "#2f7fd1", desc: "Restores pixels from the same position in a reference image. Ideal when the original image still exists.",
            items: [["DiffReplacement", "Remove unwanted AutoMosaic mosaics, partially undo edits, etc."]] },
          { title: "Other", tag: "Helper processing", color: "#6b7686",
            items: [["BGRemove (Part)", "Background removal for the masked area only (uses the background removal settings)"], ["Mosaic", "Mosaic for the masked area only (uses the mosaic tool settings)"], ["Eraser", "Makes the masked area transparent (white for formats without transparency)"]] }
        ] },
        { type: "image", id: "compare", title: "Repair/Remove model comparison", src: "images/ui/light-inpainting-en.webp", w: 1500, h: 855, caption: "The same gap filled by each model. Processing times are reference values from the test environment." },
        { type: "gallery", id: "sdxl-examples", title: "Advanced / Reference Inpaint (SDXL) examples", items: [
          { title: "Advanced Inpaint (SDXL)", sub: "Prompt: school uniform", src: "images/ex/sdxl-detail-en.webp", w: 1400, h: 696, note: "Roughly paint the area, enter a prompt, and it is redrawn." },
          { title: "Reference Inpaint (SDXL)", sub: "Keeps composition and mood", src: "images/ex/sdxl-reference-en.webp", w: 1400, h: 721, note: "Without a reference image, the original image itself is used as the reference." }
        ] },
        { type: "figure", id: "sdxl", title: "Advanced / Reference Inpaint settings", src: "images/ui/inpaint-sidebar-sdxl-en.webp", w: 469, h: 985, pw: 280,
          markers: [[7, 5.6], [7, 9.6], [7, 43], [7, 77], [7, 81.6], [7, 86.4], [7, 95.4]],
          rows: [
            ["Preset", "Save and apply prompt combinations."],
            ["Prompt", "What you want to draw. Japanese or English both work."],
            ["Negative prompt", "What you want to avoid (optional)."],
            ["Model", "The SDXL model to use."],
            ["Generation preset", "Small / Medium / Big_Change set how strongly to rewrite; High Speed (4step / 8step) sets speed."],
            ["Details", "Denoising strength, prompt adherence and more. The presets are usually enough."],
            ["Generate", "Runs generation on the masked area."]
          ], note: "Turn on \"Import image generation info into inpaint prompts\" in Settings to pre-fill the prompt from the opened image. Reference Inpaint also lets you choose a reference image and mask preprocessing (original / fill / latent noise)." },
        { type: "image", id: "gpt-example", title: "GPT/Gemini Inpaint example", src: "images/ex/gpt-gemini-en.webp", w: 1400, h: 722, maxw: 900,
          caption: "Example instruction: \"Change the background to the sea.\" We recommend describing both the change and the area in text, without a mask." },
        { type: "figure", id: "external", title: "External services (GPT / Gemini) settings", src: "images/ui/gemini-sidebar-en.webp", w: 462, h: 1238, pw: 260,
          markers: [[4, 2.4], [4, 42.9], [4, 78.8], [4, 87.4], [4, 91.8], [50, 97.2]],
          rows: [
            ["Prompt", "Describe the change in natural language (Japanese also works)."],
            ["Reference images", "Drag & drop or click Add to send extra images along with the current one."],
            ["Model", "Gemini: Nano Banana 2.1 / 2 Lite / Pro. GPT: gpt-image models."],
            ["Generation settings", "Gemini: output resolution and thinking level. GPT: quality, size and transparency handling."],
            ["Connection", "Enter and save your API key (stored encrypted for this Windows user). Links to API key setup and usage / billing are also here."],
            ["Generate", "Sends the image to the service for editing."]
          ], note: "GPT / Gemini are billed per use; NovelAI's Anlas usage depends on your plan and generation settings. Images are sent to the provider's servers." },
        { type: "image", id: "novelai-example", title: "NovelAI Inpaint example", src: "images/ex/novelai-inpaint.webp", w: 1220, h: 900, maxw: 760,
          caption: "The background was masked (small inset at the bottom) and redrawn with the prompt \"night\". The person stays as is; only the masked area becomes a night scene." },
        { type: "figure", id: "novelai", title: "NovelAI Inpaint settings", src: "images/ui/novelai-sidebar-en.webp", w: 478, h: 1105, pw: 260,
          markers: [[7, 4.1], [7, 30.5], [7, 38.2], [7, 44.5], [7, 49.6], [7, 89.9], [8, 95.7]],
          rows: [
            ["Prompt / Negative prompt", "What to draw in the masked area, and what to avoid."],
            ["Add character", "Lets you give each character its own prompt."],
            ["Model", "The NovelAI model to use."],
            ["NovelAI connection", "Enter and save your NovelAI API key (persistent token)."],
            ["Advanced settings", "Send area, processing resolution, inpaint strength, Steps / CFG, sampler, seed and more. The defaults are usually fine."],
            ["Image Reference", "Sets a reference image."],
            ["Generate", "Redraws the masked area with NovelAI."]
          ], note: "NovelAI Inpaint requires a mask and redraws only the masked area. A NovelAI subscription is required; Anlas usage depends on your plan and generation settings." },
        { type: "text", id: "diff", title: "Diff replacement", paras: [
          "Restores pixels from the same position in a reference image (the image before mosaic, or before editing). Only the area painted with the mask is restored.",
          "How to remove unwanted AutoMosaic mosaics is explained on the [Mosaic page](#/p/mosaic/am-remove)."
        ] },
        { type: "figure", id: "diff-ref", title: "Diff replacement reference", src: "images/ui/diff-reference-en.webp", w: 649, h: 437, pw: 420,
          markers: [[2, 21.2], [8, 34.4], [8, 44.7], [8, 55], [2, 66.3]],
          rows: [
            ["Select reference", "Ctrl+R opens this dialog."],
            ["Use current image folder (Auto)", "To restore the current image to its state before editing."],
            ["Select folder", "Automatically finds an image with the same or a similar name in a folder of originals, such as AutoMosaic's input folder."],
            ["Select image file", "To use one specific image as the reference."],
            ["Prefer currently edited image file", "If the reference folder is the current folder, the saved current file is used first."]
          ], note: "If the AutoMosaic log is in the same folder, the original image is set automatically. Hold Alt+R to show the reference image on the canvas and confirm it's the right one." },
        { type: "tips", id: "mask", title: "Mask handling", items: [
          "Choose what happens to the mask after processing with \"Inpaint mask after processing\" in Settings: Clear after processing / Keep after processing / Restore only on Undo.",
          "The AI auto mask model (SAM2.1) and mask growing / hole filling can be adjusted under Settings > Processing.",
          "Turn on \"Keep the inpaint settings sidebar open\" to keep the sidebar open when switching models."
        ] }
      ]
    },

    /* ---------- Paint / text / selection ---------- */
    paint: {
      title: "Paint, text & selection", icon: "pen.png",
      summary: "Pen, fill, eraser, text and selection, plus image insert and watermark.",
      lead: "Covers basic editing: simple drawing, adding text, and selecting an area to move, crop or transform.",
      blocks: [
        { type: "strip", id: "toolbar", title: "Toolbar", src: "images/ui/paint-en.webp", w: 1021, h: 43, scale: 1.25,
          markers: [2.1, 5.6, 14.1, 26.6, 37.5, 48.9, 53.1, 63.1, 74.8, 79.5, 83.2, 86.9, 90.5, 94.2, 97.8],
          rows: [
            ["Color palette", "Color used by the pen, fill, solid mosaic and color replacement."],
            ["Pen", "Left-drag to draw."],
            ["Pen size", "Also changeable with right click + wheel."],
            ["Fill", "Fills the area of the same color where you left-click."],
            ["Tolerance", "0 fills only the exact color; higher values include similar colors (right click + wheel)."],
            ["Eyedropper", "Picks the color where you click."],
            ["Eraser", "Erases the traced area."],
            ["Eraser size", "Also changeable with right click + wheel."],
            ["Text", "Configure in the right sidebar, then click to place text."],
            ["Rectangle select", "Select a rectangle (Enter / double-click to confirm)."],
            ["Free select", "Select a traced shape (Enter / double-click to confirm)."],
            ["Move", "Cuts the selection and moves it."],
            ["Copy", "Duplicates the selection and moves it."],
            ["Selection processing", "Crop, background processing, delete / expand strips (see below)."],
            ["Transform", "Flip horizontal / vertical, rotate 90° left / right."]
          ] },
        { type: "table", id: "select", title: "Selection processing", head: ["Menu", "Description", "Key"], rows: [
          ["Crop", "Crops the image to the selection.", ""],
          ["Background processing for selection", "Processes only the selection with the current background removal settings.", ""],
          ["Delete vertical", "Removes the selection vertically and joins the left and right sides.", "Ctrl+Alt+V"],
          ["Delete horizontal", "Removes the selection horizontally and joins the top and bottom.", "Ctrl+Alt+H"],
          ["Expand vertical", "Inserts a vertical strip to increase the image width.", "Ctrl+Shift+V"],
          ["Expand horizontal", "Inserts a horizontal strip to increase the image height.", "Ctrl+Shift+H"],
          ["Copy / paste / cut", "", "Ctrl+C / Ctrl+V / Ctrl+X"]
        ] },
        { type: "figure", id: "text", title: "Text", stack: true, src: "images/ui/text-en.webp", w: 1400, h: 1004, pw: 1000,
          markers: [[1.5, 43], [73.8, 9.6], [73.8, 19.7], [84.3, 19.7], [92.5, 19.7], [73.8, 28.2], [81, 28.2], [73.8, 32.4], [73.8, 42.1], [73.8, 48.3], [73.8, 51.7], [73.8, 55.3]],
          rows: [
            ["Text on canvas", "Left click to place. Drag to move; use the round handle above to rotate."],
            ["Text", "The text to add. Line breaks are allowed."],
            ["Add to Image", "Places the text in the center of the image."],
            ["Apply", "Confirms the placement (right click / Enter also work)."],
            ["Cancel", "Cancels the placement (Esc)."],
            ["Text Style", "Tab for font, color and other settings."],
            ["Background / Bubble", "Tab for text background and speech bubbles: shape (rectangle, rounded, ellipse, soft ellipse, burst, thought / cloud), tail, background color, border and padding."],
            ["Font / size / spacing", "Spacing 100% is standard; the button on the right resets it."],
            ["Text color / opacity", ""],
            ["Text style", "Bold (B), italic (I), underline (U)."],
            ["Direction", "Check for vertical writing."],
            ["Outline", "Outline on / off, color and width."]
          ], note: "Until you apply, you can change everything in the right sidebar as often as you like." },
        { type: "figure", id: "insert", title: "Image insert", src: "images/ui/insert-sidebar-en.webp", w: 466, h: 537, pw: 300,
          rows: [
            ["Choose an asset", "Images placed in the app's image folder are listed in the sidebar."],
            ["Insert", "Double-click to place it on the canvas."],
            ["Confirm", "Enter or double-click to confirm, Esc to cancel."]
          ], note: "Putting frequently used assets such as speech bubbles and watermark logos in the image folder is handy." },
        { type: "figure", id: "watermark", title: "Watermark", src: "images/ui/watermark-en.webp", w: 1400, h: 918, pw: 1000, stack: true,
          markers: [[2.2, 11.5], [2.2, 19.6], [2.2, 29.1], [2.2, 32.2], [2.2, 35.2], [2.2, 38.3], [2.2, 41], [2.2, 55.6], [2.2, 66.7], [2.2, 69.7], [2.2, 72.8], [2.2, 92.3], [6.4, 92.3], [38.6, 92.3]],
          rows: [
            ["Type", "Text / image. Images are chosen from the image folder."],
            ["Text", "The watermark text."],
            ["Font", ""],
            ["Width", "Width of the whole watermark relative to the image width."],
            ["Text color", ""],
            ["Transparency", "0% is fully visible, 100% fully transparent."],
            ["Outline", "Outline on / off, color and width."],
            ["Position", "Choose from 9 positions."],
            ["Offset", "Shift from the position (px)."],
            ["Rotation", "Angle (deg)."],
            ["Tile", "Tiles the watermark across the image, with adjustable spacing."],
            ["Apply", "Applies to the current image."],
            ["Apply to Folder Images", "Applies to every image in the same folder."],
            ["Close", ""]
          ], note: "Settings are previewed on the canvas, so you can adjust while you watch." }
      ]
    },

    /* ---------- Color / AI correction ---------- */
    color: {
      title: "Color & AI correction", icon: "manualcoloradjust.png",
      summary: "Manual slider adjustments and AI correction for noise, blur, JPEG artifacts and more.",
      lead: "Use manual adjustment to tune brightness and color with sliders, or AI correction to fix specific problems with dedicated models. Both support folder batch processing.",
      blocks: [
        { type: "strip", id: "toolbar", title: "Toolbar", src: "images/ui/color-ai-en.webp", w: 764, h: 42, scale: 1.5,
          markers: [2.6, 17.3, 42.8, 78.1, 92.3, 97.1],
          rows: [
            ["Manual color adjustment", "Opens the manual color adjustment window."],
            ["Category", "Purpose of the AI correction (see below)."],
            ["Preset", "Model / preset for the category."],
            ["Strength", "100 applies the result as is, 0 keeps the original. Negative values change in the opposite direction (-200 to 200)."],
            ["Folder", "When on, running processes every image in the same folder (you choose to overwrite or save separate files first)."],
            ["Run", "Runs the AI correction."]
          ] },
        { type: "figure", id: "manual", title: "Manual color adjustment", src: "images/ui/manualcolor-en.webp", w: 560, h: 967, pw: 340,
          markers: [[5, 6.4], [5, 10], [5, 27.1], [5, 38.9], [5, 58.6], [3.5, 93.5], [77.5, 93.5], [3.5, 96.6], [14.5, 96.6], [41.5, 96.6]],
          rows: [
            ["Preset", "Save, load and delete named settings."],
            ["Basic adjustments", "Brightness, contrast, saturation, color temperature, tint"],
            ["RGB adjustments", "Red, green, blue"],
            ["Advanced adjustments", "Gamma, hue shift, clarity, sharpness, shadows, highlights"],
            ["Tone mapping", "Overall strength, deepen shadows, accentuate highlights (light / shadow depth)"],
            ["Show adjusted result on canvas", "Turn off to compare with the original."],
            ["Expand preview", "Shows before / after previews side by side."],
            ["Apply", "Applies to the current image."],
            ["Apply to Folder Images", "Applies the same settings to every image in the folder."],
            ["Reset", "Resets all values."]
          ] },
        { type: "table", id: "ai", title: "AI correction categories", lead: "Choose a category, then a preset, and run. Models are downloaded on first use.", head: ["Category", "Presets", "Use"], rows: [
          ["Auto Color", "Standard / Black Crush / Black Crush+ / High Quality", "Naturally balances overall color and brightness. Black Crush deepens shadows for contrast."],
          ["Brightness", "Exposure Corr. / Low-Light 1 / Low-Light 2", "Eases blown highlights and crushed shadows; brightens dark images."],
          ["Photo Color", "Color/Tone Corr.1 / Color/Tone Corr.2", "Adjusts color and tone of photos."],
          ["Denoise", "Light / Medium / Strong / Detail Focus / Texture Focus / Alt Method", "Reduces grain and compression noise. Detail Focus and Texture Focus are for real photos."],
          ["Deblur", "General Blur / JPEG Blur / Motion Deblur / Defocus Deblur", "Fixes camera shake, motion blur and out-of-focus blur."],
          ["JPEG Repair", "Standard / Heavy Compression", "Reduces JPEG block noise and smearing."],
          ["Moire Repair", "Moire Reduction / High-Quality Moire Reduction", "Reduces stripe patterns such as those from photographing screens."],
          ["Color Artifact", "Banding Correction / Purple Fringe Fix", "Reduces color banding (false contours) in gradients and purple fringing on edges."]
        ] },
        { type: "gallery", id: "examples", title: "Examples", items: [
          { title: "Auto Color", a: "images/ex/autocolor-a.webp", b: "images/ex/autocolor-b.webp", w: 900, h: 900 },
          { title: "Photo Color", a: "images/ex/photo-a.webp", b: "images/ex/photo-b.webp", w: 900, h: 601 },
          { title: "Auto Color (landscape)", a: "images/ex/landscape-a.webp", b: "images/ex/landscape-b.webp", w: 900, h: 601 },
          { title: "JPEG Repair", a: "images/ex/jpeg-a.webp", b: "images/ex/jpeg-b.webp", w: 890, h: 985 },
          { title: "Denoise", a: "images/ex/noise-a.webp", b: "images/ex/noise-b.webp", w: 900, h: 599 },
          { title: "Deblur (motion)", a: "images/ex/motion-a.webp", b: "images/ex/motion-b.webp", w: 900, h: 677 },
          { title: "Deblur (defocus)", a: "images/ex/focus-a.webp", b: "images/ex/focus-b.webp", w: 797, h: 979 },
          { title: "Low-light correction", a: "images/ex/lowlight-a.webp", b: "images/ex/lowlight-b.webp", w: 651, h: 976 },
          { title: "Moire Repair", a: "images/ex/moire-a.webp", b: "images/ex/moire-b.webp", w: 900, h: 553 }
        ] }
      ]
    },

    /* ---------- Background removal ---------- */
    bgremove: {
      title: "Background removal", icon: "bg_remove.png",
      summary: "AI makes the background transparent, white, blurred or a set color. Foreground removal and color replacement too.",
      lead: "The AI detects the subject and makes the background transparent or replaces it. You can also process only a selection or a masked area.",
      blocks: [
        { type: "strip", id: "toolbar", title: "Toolbar", src: "images/ui/bgremove-en.webp", w: 414, h: 43, scale: 1.5,
          markers: [12.6, 36.7, 70.5, 85.0, 94.7],
          rows: [
            ["Model", "Model / method for background processing (see below)."],
            ["Background", "Transp. / White / Blur / Color (palette color)."],
            ["Threshold", "Auto, or 10 (narrow removal) to 90 (wide)."],
            ["Folder", "When on, running processes every image in the same folder (you choose to overwrite or save separate files first)."],
            ["Run", "Runs background removal, foreground removal or color replacement."]
          ] },
        { type: "table", id: "models", title: "Choosing a model", head: ["Model", "Characteristics"], rows: [
          ["BiRef-D (BiRefNet_dynamic)", "High-accuracy general model. Handles hair and fine detail fairly cleanly. Start here."],
          ["BiRef-M (BiRefNet_dynamic-matting)", "Focused on edge matting. Try it when BiRef-D gives hard edges."],
          ["BEN2", "Detailed edges for people and products. When contours and hair matter."],
          ["base", "General background removal. Stable, but fine hair and semi-transparent edges can be rough."],
          ["MVANet", "High-detail model. Strong on detail but heavier."],
          ["Foreground removal", "The reverse of normal: removes the foreground and keeps the background."],
          ["Color replacement", "No AI. Replaces colors close to the pen color with transparent, white or a set color. For plain backgrounds."]
        ] },
        { type: "gallery", id: "example", title: "Examples", items: [
          { title: "Transparent background", a: "images/ex/bg-a.webp", b: "images/ex/bg-b.webp", w: 900, h: 900, alpha: true },
          { title: "Blur background", a: "images/ex/bg2-a.webp", b: "images/ex/bg2-b.webp", w: 900, h: 900 },
          { title: "White background", a: "images/ex/bg3-a.webp", b: "images/ex/bg3-b.webp", w: 900, h: 540 }
        ] },
        { type: "tips", id: "partial", title: "Processing only part of the image", items: [
          "Select an area with a selection tool, then use \"Background processing for selection\" in the Selection processing menu.",
          "Use \"BGRemove (Part)\" in the inpainting tools to process only the masked area."
        ] }
      ]
    },

    /* ---------- Resize / convert ---------- */
    resize: {
      title: "Resize & convert", icon: "resize.png",
      summary: "Resize and AI upscaling; convert to PNG / JPG / WebP / PDF and compress.",
      lead: "Change image size (including high-quality AI upscaling), convert format and color mode, and reduce file size.",
      blocks: [
        { type: "strip", id: "toolbar", title: "Resize", src: "images/ui/resize-en.webp", w: 624, h: 42, scale: 1.6,
          markers: [6.7, 18.8, 26.0, 34.8, 63.6, 90.1, 96.5],
          rows: [
            ["Mode", "Fix (fixed size) / % (percent) / Lng (long side)."],
            ["Width", "New width."],
            ["Lock aspect ratio", "When on, keeps the aspect ratio."],
            ["Height", "New height."],
            ["Upscale method", "Standard Resize or AI upscalers (see below)."],
            ["Folder", "When on, running processes every image in the same folder (you choose to overwrite or save separate files first)."],
            ["Run", "Runs the resize."]
          ] },
        { type: "table", id: "upscale", title: "Upscale methods", lead: "AI upscaling gives higher quality but takes longer than Standard Resize.", head: ["Method", "Best for"], rows: [
          ["Standard Resize", "Non-AI scaling. Use this for downscaling."],
          ["AI: Anime/Illustration", "Illustrations and anime-style images"],
          ["AI: Balanced", "When unsure"],
          ["AI: Fine Lines/Texture", "Line art and fine patterns"],
          ["AI: Nature/Texture", "Landscape photos"],
          ["AI: Photo Restore", "People and other real photos"],
          ["AI: Lite/Fast", "When speed matters most"]
        ] },
        { type: "strip", id: "convert", title: "Format conversion & compression", src: "images/ui/convert-en.webp", w: 235, h: 41, scale: 1.6,
          markers: [30.6, 74.5, 90.2],
          rows: [
            ["Format", "PNG / JPG / WEBP / PDF / Compress, and RGB / RGBA (with or without transparency)."],
            ["Folder", "When on, running processes every image in the same folder (you choose to overwrite or save separate files first)."],
            ["Convert", "Converts to the chosen format and color mode."]
          ] },
        { type: "tips", items: [
          "When converting you can choose \"Convert and Keep Original\" or \"Convert and Delete Original\". When compressing, choose keep or replace.",
          "Choosing PDF with folder batch combines all images in the folder into one PDF.",
          "JPEG / WebP quality, PNG compression level, PDF creation and PNG color reduction for compression (up to 256 colors) can be changed in Settings."
        ] }
      ]
    },

    /* ---------- Metadata ---------- */
    metadata: {
      title: "Metadata", icon: "metaclean.png",
      summary: "View, edit, copy and remove AI generation info.",
      lead: "View and edit the prompts and parameters embedded in images from Stable Diffusion, ComfyUI, NovelAI and others, and remove them in bulk before publishing.",
      blocks: [
        { type: "strip", id: "toolbar", title: "Toolbar", src: "images/ui/metadata-en.webp", w: 294, h: 43, scale: 1.6,
          markers: [8.5, 35.7, 66.3, 78.2, 90.8],
          rows: [
            ["Also remove embedded data", "When on, embedded data inside the image (such as NovelAI stealth info) is removed too."],
            ["Status", "Shows no metadata / metadata / AI metadata."],
            ["Folder", "When on, running processes every image in the same folder (you choose to overwrite or save separate files first)."],
            ["Remove", "Removes the metadata."],
            ["Details", "Opens / closes the Metadata Details sidebar."]
          ] },
        { type: "figure", id: "sidebar", title: "Metadata Details", src: "images/ui/metaview-en.webp", w: 688, h: 1252, pw: 300,
          markers: [[3.2, 3.6], [3.2, 6.2], [3.2, 38.3], [3.2, 67.3], [42, 35.2], [14, 98.2], [67, 98.2]],
          rows: [
            ["Detected AI image type", "Automatically detects SD (A1111 etc.) / ComfyUI / NovelAI, including stealth embedded info."],
            ["Prompt", "The prompt used for generation."],
            ["Negative Prompt", ""],
            ["All Parameters", "Steps, sampler, CFG and more."],
            ["Copy", "Copies that field."],
            ["Copy All", "Copies prompt, negative prompt and parameters together."],
            ["Save", "Saves your edits to the image."]
          ] },
        { type: "tips", items: [
          "Turn on \"Auto-show metadata details at startup\" in Settings to open the sidebar at startup.",
          "Turn on \"Import image generation info into inpaint prompts\" in Settings to use the prompt as the starting value for Advanced, Reference and NovelAI Inpaint."
        ] }
      ]
    },

    /* ---------- Tags / captions ---------- */
    tagger: {
      title: "Tags & captions", icon: "tagger1.png",
      summary: "Generate Danbooru-style tags or English captions, plus a bulk tag editor for datasets.",
      lead: "The AI reads the image and generates tags (Danbooru style) or an English description (caption). Useful for building LoRA training data and organizing images.",
      blocks: [
        { type: "table", id: "types", title: "Two generation types", head: ["", "Tags", "Caption"], rows: [
          ["Example output", "1girl, solo, long_hair, blonde_hair, flower, smile …", "A young woman with long blonde hair holds a bouquet of flowers …"],
          ["Best for", "Training tags for Stable Diffusion-style models, building prompts", "Captions for models trained on sentences, image descriptions"],
          ["What you can adjust", "Cutoff, output categories", "Input (Image only / Image + tags), thinking on / off"],
          ["Output", "TXT file / Embed in image / Clipboard", "TXT file / Clipboard"]
        ] },
        { type: "strip", id: "tags", title: "Tags", src: "images/ui/tagger-en.webp", w: 829, h: 47, scale: 1.4,
          markers: [9.7, 33.9, 53.5, 61.5, 76.4, 87.7, 92.3, 97.3],
          rows: [
            ["Generation type", "Choose \"Tags\"."],
            ["Model", "Model used for tagging (see below). Switching models also resets the cutoff to that model's default."],
            ["Cutoff", "How confident a tag must be to be output. Higher gives fewer tags, lower gives more."],
            ["Category settings", "Which categories to output (general, character, rating, ...) and per-category cutoffs."],
            ["Output", "TXT file (.txt with the same name as the image) / Embed in image / Clipboard (see below)."],
            ["Folder", "When on, running processes every image in the same folder (not available for Clipboard)."],
            ["Run", "Generates and writes to the chosen output."],
            ["Bulk tag editor", "Edits the .txt tags in the folder together (see below)."]
          ] },
        { type: "table", id: "tagmodels", title: "Tagging models", lead: "No model is bundled with the app; each is downloaded on first use. If unsure, start with the default, WD EVA02-Large v3.", head: ["Model", "Default cutoff", "Tags", "Knowledge up to", "Notes"], rows: [
          ["WD EVA02-Large v3", "0.35", "10.9k", "Feb 2024", "Default model. The WD standard"],
          ["WD EVA02 2026 Canary", "0.55", "16.5k", "May 2026", "Derivative of WD EVA02-Large v3 trained on newer data"],
          ["PixAI Tagger v1.0", "0.35", "30.9k", "May 2026", "Heavy, high-resolution model. GPU recommended"],
          ["CL Tagger v1.02", "0.55", "", "", "Also outputs quality and rating categories"],
          ["CL Tagger v2.00", "0.55", "108.0k", "~2026 (estimated)", "Over 100k tags. Own license: place the files manually"],
          ["OppaiOracle V1.1", "0.75", "19.3k", "~2024 (estimated)", "Trained on data with wrong / missing tags corrected"],
          ["Z3D-E621 ConvNext", "0.35", "", "", "e621-style tags (for furry images)"]
        ] },
        { type: "strip", id: "caption", title: "Caption", src: "images/ui/caption-en.webp", w: 833, h: 47, scale: 1.4,
          markers: [9.7, 31.5, 40.2, 53.4, 73.8, 87.4, 92, 97.1],
          rows: [
            ["Generation type", "Choose \"Caption\" to generate an English paragraph describing the image."],
            ["Model", "Model used for captions (see below)."],
            ["Thinking on / off", "When on, the model considers the image before writing. Often more accurate, but slower."],
            ["Input", "Image only / Image + tags. With Image + tags, tags are first generated with the model, cutoff and category settings chosen under Tags, and used as hints for the caption."],
            ["Output", "TXT file (image-name.caption.txt) / Clipboard."],
            ["Folder", "When on, running processes every image in the same folder (not available for Clipboard)."],
            ["Run", "Generates and writes to the chosen output."],
            ["Bulk tag editor", "Edits tag .txt files in bulk (.caption.txt files are excluded)."]
          ] },
        { type: "table", id: "capmodels", title: "Caption models", lead: "No model (including the default, Florence-2 Base) is bundled with the app; each is downloaded on first use. If you run short of GPU memory (VRAM), choose a smaller model.", head: ["Model", "First download", "VRAM guide", "Image + tags", "Thinking"], rows: [
          ["Florence-2 Base (default)", "~0.93 GB", "—", "— (image only)", "—"],
          ["Qwen3.5 2B", "~1.95 GB", "4 GB", "Yes", "Yes"],
          ["Gemma 4 E2B", "~3.83 GB", "4.5 GB", "Yes", "Yes"],
          ["LFM3-VL-2B", "~1.43 GB", "4 GB", "Yes", "Yes"],
          ["JoyCaption Beta One", "~5.36 GB", "6.5 GB", "Yes", "—"]
        ] },
        { type: "table", id: "outputs", title: "Output", head: ["Output", "Description"], rows: [
          ["TXT file", "Saves in the image's folder. For Sample.png, tags use Sample.txt and captions use Sample.caption.txt."],
          ["Embed in image", "Writes the tags into the image metadata as a prompt (PNG: parameters, JPEG / WebP: Exif). Shown as the prompt in Metadata Details. Tags only."],
          ["Clipboard", "Copies the result for the current image. Not available for folder batch."]
        ] },
        { type: "figure", id: "categories", title: "Category settings", src: "images/ui/tagger-setting-en.webp", w: 700, h: 421, pw: 440,
          markers: [[4, 35], [35, 35], [66, 35], [3, 93], [75.5, 93]],
          rows: [
            ["Output category", "Only tags in checked categories are output. Available categories depend on the model."],
            ["Threshold source", "Use the common cutoff from the toolbar, or set a custom value per category."],
            ["Custom value", "Cutoff for each category."],
            ["Reset", "Restores the defaults (ratings are not output by default)."],
            ["Save", "Saves the settings for this model."]
          ] },
        { type: "figure", id: "editor", title: "Bulk tag editor", stack: true, src: "images/ui/tageditor-en.webp", w: 1500, h: 872, pw: 1100,
          markers: [[1.3, 5.2], [19, 5.2], [66.3, 5.2], [18.9, 50.5], [73, 50.5], [73, 76.8]],
          rows: [
            ["Image Files", "Images in the folder. Use Ctrl / Shift for multiple selection."],
            ["Image Preview", "The selected image."],
            ["Image Tags", "Tags in the selected image's .txt. Add tags separated by commas (Undo / Redo supported)."],
            ["Tag Search / Refine", "Lists every tag in the folder with counts. Click a tag to filter images that contain / exclude it."],
            ["Bulk Tag Delete / Replace", "Removes a tag from every .txt, or replaces it with other tags."],
            ["Bulk Add Tags", "Adds tags to the start or end of every .txt (e.g. trigger words)."]
          ] },
        { type: "steps", id: "dataset", title: "Example: building a training dataset", steps: [
          "Put the training images in one folder and open one of them",
          "In Tags, set Output to \"TXT file\", turn Folder on and run (every image gets a .txt with the same name)",
          "In the bulk tag editor, remove unwanted tags, replace inconsistent spellings and add a trigger word at the start",
          "If needed, use \"Rename files\" to number them sequentially (the .txt files are renamed too)"
        ] }
      ]
    },

    /* ---------- Sorting / organizing ---------- */
    organize: {
      title: "Sorting & organizing", icon: "folder1.png",
      summary: "Sort into folders, open in other apps, rename files, find duplicate / similar images.",
      lead: "Sort images into folders with a single key while you browse, rename files in bulk, and find and clean up duplicate or similar images.",
      blocks: [
        { type: "strip", id: "bookmark", title: "Sorting & bookmarks", src: "images/ui/bookmark-en.webp", w: 269, h: 41, scale: 1.5,
          markers: [36.8, 78.8, 91.8],
          rows: [
            ["Slots 1–5", "Left click (or keys 1–5) moves / copies the image to the registered folder. Right click (Ctrl+1–5) opens that folder. If an EXE is registered, the image opens in that app."],
            ["Move / copy", "On: copy, off: move."],
            ["Folder settings", "Register folders or EXEs (e.g. CLIP STUDIO) for slots 1–5."]
          ], note: "Confirmation messages when moving or deleting can be skipped with \"Skip confirmation when deleting or sorting images\" in Settings." },
        { type: "strip", id: "extra", title: "Buttons at the end of the toolbar", src: "images/ui/extra-en.webp", w: 174, h: 43, scale: 1.6,
          markers: [12.6, 38.5, 64.4, 87.4],
          rows: [
            ["Image insert", "Inserts assets on the canvas (see the Paint page)."],
            ["Watermark", "Adds a text or image watermark (see the Paint page)."],
            ["Rename files", "Renames images and their tag .txt files together."],
            ["Find duplicate or similar images", "Finds and compares duplicate or similar images in the folder."]
          ] },
        { type: "figure", id: "rename", title: "Rename files", src: "images/ui/filechange-en.webp", w: 1000, h: 643, pw: 860, stack: true,
          markers: [[7.3, 13.7], [70.5, 13.7], [10.3, 18.9], [32.6, 18.9], [3, 24.2], [80, 24.2], [70.5, 95.5], [80.5, 95.5]],
          rows: [
            ["Naming", "Replace with sequence / Sequence before original name / Sequence after original name / Add text only."],
            ["Sort by", "Created / Modified / Name, ascending / descending. Clicking a column header also switches it."],
            ["Start number / digits", "Starting value and number of digits for the sequence."],
            ["Prefix / suffix", "Text added before / after the name."],
            ["Preview", "Shows before / after and the matching tag .txt names that change with them."],
            ["Status", "Ready / unchanged / error, etc."],
            ["Undo rename", "Reverts the last rename."],
            ["Rename", "Renames as previewed. Extensions are preserved."]
          ] },
        { type: "figure", id: "find", title: "Find duplicate or similar images", src: "images/ui/find-en.webp", w: 1100, h: 710, pw: 860, stack: true,
          markers: [[4.5, 10.5], [92.5, 10.5], [13, 14.5], [2.7, 18.5], [31.5, 17.9], [74.5, 96.5], [83.5, 96.5]],
          rows: [
            ["Find", "Duplicate images (identical content / pixels) or similar images (candidates that look alike)."],
            ["Search", "Searches the folder. Only saved files are included."],
            ["Match strictness", "Stricter to the right, broader to the left."],
            ["Groups", "Matches found. Check \"Delete\" on the images you want to move to the trash."],
            ["Compare", "Ctrl / Shift+click two images to compare them side by side (wheel to zoom, both sides linked). Images of the same size can highlight differences in red."],
            ["Open in editor", "Opens the chosen image in the main window."],
            ["Move to trash", "Moves the checked images to the trash."]
          ], note: "Similar images are only candidates that look alike, not guaranteed to be the same. Compare before deleting." }
      ]
    }
  }
};
