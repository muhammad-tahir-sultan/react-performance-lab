
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initWebVitals } from './reportWebVitals.ts';
import { ErrorBoundary } from './components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)

// Log web vitals to console, or could dispatch to a redux store / context
initWebVitals(console.log);
