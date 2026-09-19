<div align="center">

# `</>` dailydevlog

**Building software engineering fundamentals, one day at a time.**

A "learning in public" site: a DSA problem every day, a short daily log,
and an AI glossary for learning the language of AI, all built over a 120-day learning journey.

[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![MDX](https://img.shields.io/badge/MDX-content-1B1F24?logo=mdx&logoColor=white)](https://mdxjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Content: CC BY 4.0](https://img.shields.io/badge/content-CC_BY_4.0-00ed64)](https://creativecommons.org/licenses/by/4.0/)

[**dailydevlog.com**](https://dailydevlog.com) · [DSA](https://dailydevlog.com/dsa) · [Daily Log](https://dailydevlog.com/daily-log) · [AI Glossary](https://dailydevlog.com/ai-glossary)

<br />

<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/screenshots/home-dark.png" />
  <img alt="dailydevlog home page with hero, consistency streak and latest activity" src=".github/screenshots/home-light.png" width="100%" />
</picture>

</div>

## What's inside

| Section | What you'll find |
| :-- | :-- |
| 🧩 **DSA** | Problem write-ups in a fixed 8-step format: restate, inputs/edge cases, approach, code, complexity and more. Tagged by difficulty and pattern. |
| 📓 **Daily Log** | A short daily entry that ties the day's work together. |
| 🌳 **AI Glossary** | 117 AI terms in 11 chapters, from perceptrons to agents. Browse them all at a glance in the **Tree** view, or learn them in order in the **Chapters** view with a short story, examples, related terms and a quick quiz per chapter. |
| 🔎 **Search** | Client-side filter across every problem and log entry, by section and tag. |

## Screenshots

> The images follow your GitHub theme. Switch between light and dark to see both.

### DSA problems

<table>
  <tr>
    <td width="50%">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset=".github/screenshots/dsa-dark.png" />
        <img alt="DSA problem list with difficulty and pattern filters" src=".github/screenshots/dsa-light.png" />
      </picture>
    </td>
    <td width="50%">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset=".github/screenshots/dsa-post-dark.png" />
        <img alt="Trapping Rain Water write-up with tags and complexity" src=".github/screenshots/dsa-post-light.png" />
      </picture>
    </td>
  </tr>
  <tr>
    <td align="center"><sub>Problem list, filterable by difficulty and pattern</sub></td>
    <td align="center"><sub>A write-up in the 8-step format</sub></td>
  </tr>
</table>

### Search

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/screenshots/search-dark.png" />
    <img alt="Search page with section and tag filters" src=".github/screenshots/search-light.png" width="70%" />
  </picture>
  <br />
  <sub>Search across everything, filtered by section and tag</sub>
</p>

### On mobile

<p align="center">
  <img alt="Home page on mobile" src=".github/screenshots/mobile-home.png" width="30%" />
  &nbsp;
  <img alt="DSA write-up on mobile" src=".github/screenshots/mobile-dsa-post.png" width="30%" />
</p>

## Features

- **Content collections + MDX.** Every problem and log entry is an `.mdx` file with a typed schema.
- **Read-along.** On problem pages, the Web Speech API follows your voice and highlights each word as you read it aloud.
- **AI Glossary.** Tree and Chapters views, search across terms and definitions, a "must-know" filter, per-term "learned" progress saved in the browser, and shareable links to any term (`/ai-glossary#rag`).
- **Consistency streak.** The home page tracks progress through the 120-day journey.
- **Light and dark themes.** Follows the system setting, with a manual toggle.
- **RSS and sitemap**, plus syntax highlighting with Shiki (`github-dark`).

## Tech stack

[Astro 7](https://astro.build) · [Tailwind CSS v4](https://tailwindcss.com) + Typography · [MDX](https://mdxjs.com) ·
`@astrojs/rss` · `@astrojs/sitemap` · TypeScript

## Project structure

```text
src/
├── content/
│   ├── dsa/                     # DSA write-ups (.mdx)
│   └── daily-log/               # daily entries (.mdx)
├── content.config.ts            # collection schemas
├── pages/
│   ├── index.astro              # home: hero, streak, latest activity
│   ├── dsa/  daily-log/         # list + [slug] pages
│   ├── ai-glossary.astro        # AI glossary: tree + chapters views
│   ├── search.astro
│   └── rss.xml.js
├── lib/
│   └── ai-glossary.ts           # glossary chapters, terms and quizzes
├── components/  layouts/  styles/
```

## Getting started

Requires Node.js **22.12+**.

```sh
git clone https://github.com/Rishabh2324/dailydevlog.com.git
cd dailydevlog.com
npm install
npm run dev
```

To run the dev server in the background instead:

```sh
astro dev --background   # start
astro dev status         # check it's running
astro dev logs           # tail logs
astro dev stop           # stop
```

| Command | Action |
| :-- | :-- |
| `npm run dev` | Start the dev server at `localhost:4321` |
| `npm run build` | Build the static site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npx astro check` | Type-check the project |

## Adding content

Add an `.mdx` file to the matching folder under `src/content/` and it's published on the next build.
The schemas in `src/content.config.ts` list the required frontmatter:

- **DSA:** `title`, `difficulty` (Easy/Medium/Hard), `pattern[]`, `date`, `timeComplexity`, `spaceComplexity`, `summary`, optional `problemUrl`
- **Daily log:** `day`, `date`, `summary`, optional `tags[]` and `links[]`

### AI Glossary

Glossary content lives in `src/lib/ai-glossary.ts`, not in content collections. Each chapter has a
`name`, a one-line `tagline` for the tree, a `story` (write `[text](#term-id)` to link a term), its
`terms` and a `quiz`. Each term has an `id` (used for its URL), `term`, `definition`, `example`,
`related` term ids and an optional `mustKnow` flag. Every id in `related` and in the story must match
an existing term.

## License

Code is MIT licensed. Written content (DSA write-ups and daily log entries) is licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
