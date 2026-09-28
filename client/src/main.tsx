import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// If a static host served 404.html and redirected to '/', recover the intended path
const savedPath = sessionStorage.getItem('spa-fallback-path');
if (savedPath) {
  sessionStorage.removeItem('spa-fallback-path');
  // Use replace so it doesn't create an extra history entry
  history.replaceState(null, '', savedPath);
}

const root = createRoot(document.getElementById('root')!);
// Enable development checks without changing production rendering.
if (import.meta.env.DEV) {
  const { StrictMode } = await import('react');
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  root.render(<App />);
}
