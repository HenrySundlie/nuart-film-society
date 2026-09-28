import { lazy, Suspense } from 'react';

const ReactMarkdown = lazy(() => import('react-markdown'));

export default function Markdown({ children }: { children: string }) {
  return (
    <Suspense fallback={null}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </Suspense>
  );
}
