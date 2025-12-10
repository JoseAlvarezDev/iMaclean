import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { WindowFrame } from './components/Layout/WindowFrame';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Views/Dashboard';
import { CleaningView } from './components/Views/CleaningView';
import { Settings } from './components/Views/Settings';
import { WelcomeModal } from './components/Modals/WelcomeModal';
import { ToastContainer } from './components/Toast/Toast';
import { generateAllMockItems } from './utils/mockData';
import './i18n';
import './styles/variables.css';
import './styles/globals.css';

function App() {
  const { theme, currentView, setCleaningItems, cleaningItems } = useStore();

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');

      const listener = (e: MediaQueryListEvent) => {
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      };

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    } else {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  // Initialize mock data
  useEffect(() => {
    if (cleaningItems.length === 0) {
      setCleaningItems(generateAllMockItems());
    }
  }, [cleaningItems.length, setCleaningItems]);

  // Register PWA service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Service worker registration failed
        });
      });
    }
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'trash':
      case 'cache':
      case 'downloads':
      case 'logs':
      case 'apps':
      case 'large-files':
        return <CleaningView viewId={currentView} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <WindowFrame>
        <Sidebar />
        {renderView()}
      </WindowFrame>
      <WelcomeModal />
      <ToastContainer />
    </>
  );
}

export default App;
