<div align="center">

# `</>` dailydevlog

**Building software engineering fundamentals, one day at a time.**

A "learning in public" site: a DSA problem every day, two written AI courses, and a short daily log,
all updated over a 120-day learning journey.

[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![MDX](https://img.shields.io/badge/MDX-content-1B1F24?logo=mdx&logoColor=white)](https://mdxjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Content: CC BY 4.0](https://img.shields.io/badge/content-CC_BY_4.0-00ed64)](https://creativecommons.org/licenses/by/4.0/)

[**dailydevlog.com**](https://dailydevlog.com) · [DSA](https://dailydevlog.com/dsa) · [AI Course](https://dailydevlog.com/ai-course) · [AI-Native SWE](https://dailydevlog.com/ai-native-engineering) · [Daily Log](https://dailydevlog.com/daily-log)

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
| 🤖 **AI Engineering** | A written, build-first course: from how LLMs work to RAG, tools, agents, MCP, evals and production. Each lesson is tagged L1–L5. |
| ⚡ **AI-Native SWE** | A second course on engineering *with* AI: workflows, agents and practices for AI-native development. |
| 📓 **Daily Log** | A short daily entry that ties the day's work together. |
| 🔎 **Search** | Client-side filter across every problem, lesson and log entry, by section and tag. |

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

### Courses

<table>
  <tr>
    <td width="50%">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset=".github/screenshots/course-dark.png" />
        <img alt="AI Engineering course landing page with learning levels" src=".github/screenshots/course-light.png" />
      </picture>
    </td>
    <td width="50%">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset=".github/screenshots/lesson-dark.png" />
        <img alt="Lesson page with prerequisites and module sidebar" src=".github/screenshots/lesson-light.png" />
      </picture>
    </td>
  </tr>
  <tr>
    <td align="center"><sub>Course overview: levels L1–L5 and the season curriculum</sub></td>
    <td align="center"><sub>Lesson page: prerequisites, module sidebar, read-along</sub></td>
  </tr>
  <tr>
    <td width="50%">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset=".github/screenshots/ai-native-dark.png" />
        <img alt="AI-Native Software Engineering course page" src=".github/screenshots/ai-native-light.png" />
      </picture>
    </td>
    <td width="50%">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset=".github/screenshots/search-dark.png" />
        <img alt="Search page with section and tag filters" src=".github/screenshots/search-light.png" />
      </picture>
    </td>
  </tr>
  <tr>
    <td align="center"><sub>AI-Native Software Engineering course</sub></td>
    <td align="center"><sub>Search across everything, filtered by section and tag</sub></td>
  </tr>
</table>

### On mobile

<p align="center">
  <img alt="Home page on mobile" src=".github/screenshots/mobile-home.png" width="30%" />
  &nbsp;
  <img alt="Lesson page on mobile" src=".github/screenshots/mobile-lesson.png" width="30%" />
  &nbsp;
  <img alt="DSA write-up on mobile" src=".github/screenshots/mobile-dsa-post.png" width="30%" />
</p>

## Features

- **Content collections + MDX.** Every problem, lesson and log entry is an `.mdx` file with a typed schema.
- **Two courses, one engine.** Courses are defined by a `course.yaml` outline plus a `lessons/` folder, and share the same pages.
- **Learning levels.** Lessons are tagged L1 (Foundation) to L5 (Production), with prerequisites and a module sidebar.
- **Read-along.** On lesson and problem pages, the Web Speech API follows your voice and highlights each word as you read it aloud.
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
│   ├── daily-log/               # daily entries (.mdx)
│   ├── ai-course/               # course.yaml outline + lessons/
│   └── ai-native-engineering/   # course.yaml outline + lessons/
├── content.config.ts            # collection schemas
├── pages/
│   ├── index.astro              # home: hero, streak, latest activity
│   ├── dsa/  daily-log/         # list + [slug] pages
│   ├── [course]/[module]/[lesson].astro
│   ├── search.astro
│   └── rss.xml.js
├── components/  layouts/  lib/  styles/
docs/                            # course plans and specs
scripts/course-next.mjs          # prints the next lesson to write
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
| `npm run course:next` | Show course progress and the next lessons to write |
| `npx astro check` | Type-check the project |

## Adding content

Add an `.mdx` file to the matching folder under `src/content/` and it's published on the next build.
The schemas in `src/content.config.ts` list the required frontmatter:

- **DSA:** `title`, `difficulty` (Easy/Medium/Hard), `pattern[]`, `date`, `timeComplexity`, `spaceComplexity`, `summary`, optional `problemUrl`
- **Daily log:** `day`, `date`, `summary`, optional `tags[]` and `links[]`
- **Course lesson:** `topic` (an id from `course.yaml`), `date`, `summary`, `estimatedMinutes`

## License

Code is MIT licensed. Written content (DSA write-ups, course lessons and daily log entries) is licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
