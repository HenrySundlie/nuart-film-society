import { useEffect, useState } from 'react';

const content = import.meta.glob<string>(
  ['../content/articles/*.md', '../content/films/*.md'],
  { query: '?raw', import: 'default' }
);

export function useMarkdown(category: 'articles' | 'films', slug?: string) {
  const [markdown, setMarkdown] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = content[`../content/${category}/${slug}.md`];
    if (load) {
      load()
        .then((text) => {
          if (active) setMarkdown(text);
        })
        .catch(() => {
          if (active) setMarkdown(null);
        });
    } else {
      setMarkdown(null);
    }
    return () => {
      active = false;
    };
  }, [category, slug]);

  return markdown;
}
