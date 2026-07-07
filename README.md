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
