# Portfolio

Personal site and writing, built with [Astro](https://astro.build).

## Stack

- Astro 7 (static output, view transitions)
- Content collections for posts (`src/content/posts`) and projects (`src/content/projects`)
- MDX, RSS, sitemap

## Commands

| Command               | Action                                     |
| :--------------------- | :------------------------------------------ |
| `npm install`           | Install dependencies                        |
| `npm run dev`           | Start local dev server at `localhost:4321`  |
| `npm run build`         | Build to `./dist/`                          |
| `npm run preview`       | Preview the production build locally        |
| `npm run astro check`   | Type-check the project                      |

## Structure

```text
src/
├── content/
│   ├── posts/       # blog posts (md/mdx)
│   └── projects/    # project cards (md)
├── components/
├── layouts/
├── pages/
└── styles/
```

## Note

I'm not a frontend/design person, so the UI and styling here were built with
[Claude](https://claude.ai). All the writing and project content is my own.

## Licence

Two kinds of work under two licences:

- **Code** — everything that makes the site run (templates, styles, scripts,
  config) is under the [GNU General Public License v3.0](LICENSE).
- **Writing and content** — the prose in `src/content/` is under
  [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/):
  share with attribution, but no commercial use and no derivatives.

