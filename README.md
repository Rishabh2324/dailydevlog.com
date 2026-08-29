# dailydevlog.com

A personal "learning in public" site: DSA problem write-ups, full-stack development notes, and a short daily log,
built and updated daily over a 4-month learning journey.

Built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com), content collections, MDX,
RSS, and a sitemap.

## Content model

Three Astro Content Collections live under `src/content/`:

- `dsa/` — problem write-ups (title, difficulty, pattern/topic, date, problem link, solution, complexity)
- `fsd/` — full-stack blog posts (title, date, tags, tech stack, summary)
- `daily-log/` — short daily entries (day number, date, tags, summary, referenced links)

Schemas are defined in `src/content.config.ts`. Add a new `.mdx` file to the relevant folder to publish an entry.

## Development

```sh
npm install
astro dev --background   # start the dev server in the background
astro dev status          # check it's running
astro dev logs            # tail logs
astro dev stop             # stop it
```

| Command           | Action                                      |
| :----------------- | :------------------------------------------ |
| `npm run dev`       | Start the dev server                        |
| `npm run build`     | Build the static site to `./dist/`          |
| `npm run preview`   | Preview the production build locally        |
| `npx astro check`   | Type-check the project                      |

## License

Code is MIT licensed. Written content (DSA write-ups, blog posts, daily log entries) is licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
