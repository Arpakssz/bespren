# however far — a love letter site

## Structure
```
love-letter-project/
├── index.html      → page structure/content
├── style.css       → all styling
├── script.js       → falling hearts, letter popup, music autoplay
├── assets/
│   ├── puppy.png
│   ├── corgi-background.png
│   └── song.mp3
└── README.md
```

## To edit
Open the whole `love-letter-project` folder in VS Code (File → Open Folder).
- Edit the message text in `index.html`, inside the `<div class="letter-content">` block.
- Edit colors/fonts/spacing in `style.css` (custom colors are set as CSS variables at the top).
- Swap images/music by replacing the files in `assets/` and keeping the same filenames — or update the `src="assets/..."` paths in `index.html` / `style.css` if you rename them.

## To preview
Just open `index.html` directly in a browser, or use the VS Code "Live Server" extension for auto-reload while editing.
