---
name: verify
description: Build, launch, and visually verify this Astro site with headless Chrome over CDP.
---

# Verifying changes to this site

Static Astro site — the surface is the rendered page in a browser.

## Build & serve

No `node`/`npx` on PATH by default; node is asdf-managed:

```bash
export PATH="$HOME/.asdf/shims:$PATH"
node_modules/.bin/astro build          # "posts/projects is empty" warnings are normal — content dirs ship empty
node_modules/.bin/astro preview --port 4173   # serves dist/
```

Content collections are empty by design. To exercise project/post rendering,
drop a temporary `.md` into `src/content/projects/` or `src/content/posts/`
(schemas in `src/content.config.ts`), build, verify, then delete it.

## Drive & screenshot

No Playwright. Use headless Chrome + raw CDP over Node's built-in WebSocket:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --remote-debugging-port=9222 \
  --user-data-dir="$SCRATCHPAD/chrome-profile" --no-first-run &
```

Then a Node script: `fetch http://127.0.0.1:9222/json/version` for the WS URL,
`Target.createTarget` → `Target.attachToTarget {flatten:true}`, drive with
`Page.navigate`, `Runtime.evaluate`, `Input.dispatchMouseEvent`/`dispatchKeyEvent`,
capture with `Page.captureScreenshot`.

Gotchas:
- Headless Chrome inherits macOS dark mode → the site's theme script starts
  dark. Force a theme with `document.documentElement.setAttribute('data-theme',
  'light' | 'dark' | 'paper')`.
- Give `Page.navigate` ~1.5s to settle (view transitions + `astro:page-load`
  scripts).
- Hover-only UI: dispatch real `mouseMoved` events; `:hover` state doesn't
  trigger from `Runtime.evaluate`.

## Worth driving

- Homepage tabs (work/cv): click, arrow-key roving focus, `#hash` restore.
- Project cards: whole card clickable via stretched name-link; AI badge
  tooltip on hover and Tab-focus (links inside must stay reachable).
- "Show more" collapse past 4 projects.
- All three themes; `--faint` text must never sit on `--surface`.
