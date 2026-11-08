import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from './pages/Home';
const ArticleMenu = lazy(() => import('./pages/ArticleMenu'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
import Menu from './components/Menu';
import styled from '@emotion/styled';
import { theme } from './theme';
import { Global } from '@emotion/react';

const globalStyles = `
  html, body {
    margin: 0;
    padding: 0;
    font-family: ${theme.typography.fontFamily};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  * {
    box-sizing: border-box;
  }
  
  a {
    color: ${theme.colors.text.primary};
    text-decoration: none;
    transition: ${theme.transitions.default};
  }
  
  a:hover {
    color: ${theme.colors.secondary};
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px)
    env(safe-area-inset-bottom, 0px) env(safe-area-inset-left, 0px);
`;

export default function App() {
  return (
    <Router>
      <Global styles={globalStyles} />
      <AppContainer>
        <MenuVisibilityController />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<ArticleMenu />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AppContainer>
    </Router>
  );
}

function MenuVisibilityController() {
  const location = useLocation();
  const isHome = location.pathname.replace(/\/?$/, '/') === '/';

  // The homepage has its own visible navigation in the sidebar.
  if (isHome) return null;
  return <Menu />;
}
