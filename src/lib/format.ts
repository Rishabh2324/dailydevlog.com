const TAG_VARIANTS = ['purple', 'orange', 'blue', 'pink'] as const;

export function tagVariant(tag: string): (typeof TAG_VARIANTS)[number] {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = (hash * 31 + tag.charCodeAt(i)) >>> 0;
  return TAG_VARIANTS[hash % TAG_VARIANTS.length];
}

export function difficultyVariant(difficulty: string): 'green-soft' | 'orange' | 'pink' {
  if (difficulty === 'Easy') return 'green-soft';
  if (difficulty === 'Medium') return 'orange';
  return 'pink';
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}
