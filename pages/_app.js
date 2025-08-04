import { useEffect } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(reg => console.log('Service Worker registered', reg))
          .catch(err => console.error('Service Worker registration failed:', err));
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
