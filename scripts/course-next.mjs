// Prints progress and the next unpublished lessons for each course.
// Usage: npm run course:next [-- <course-id>] [-- --count N]
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

const args = process.argv.slice(2);
const countFlag = args.indexOf('--count');
const count = countFlag === -1 ? 3 : Number(args[countFlag + 1]);
const only = args.find((arg, i) => !arg.startsWith('--') && i !== countFlag + 1);

const courses = readdirSync('src/content', { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join('src/content', d.name, 'course.yaml')))
  .map((d) => d.name)
  .filter((id) => !only || id === only);

function publishedTopics(dir) {
  if (!existsSync(dir)) return new Set();
  const ids = new Set();
  for (const file of readdirSync(dir, { recursive: true })) {
    if (!String(file).endsWith('.mdx')) continue;
    const text = readFileSync(join(dir, String(file)), 'utf8');
    const topic = text.match(/^topic:\s*['"]?([\d.]+)['"]?/m)?.[1];
    if (topic && !/^draft:\s*true/m.test(text)) ids.add(topic);
  }
  return ids;
}

for (const course of courses) {
  const seasons = parse(readFileSync(join('src/content', course, 'course.yaml'), 'utf8'));
  const published = publishedTopics(join('src/content', course, 'lessons'));
  const topics = seasons.flatMap((s) =>
    s.modules.flatMap((m) => m.topics.map((t) => ({ ...t, season: s.number, module: m })))
  );
  const next = topics.filter((t) => !published.has(t.id)).slice(0, count);

  console.log(`\n${course}  ${published.size}/${topics.length} published`);
  for (const t of next) {
    const last = t.module.topics.at(-1).id === t.id ? '  (last in module: add assessment)' : '';
    const flags = [t.volatile && 'volatile', t.maturity].filter(Boolean).join(', ');
    console.log(`  ${t.id.padEnd(7)} ${t.title} [${t.level}${flags ? `, ${flags}` : ''}]${last}`);
  }
  if (next.length === 0) console.log('  All outlined topics are published. Extend course.yaml.');
}
