import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

// Replace these with your actual Auth0 domain and client ID
const domain = 'dev-rb7h2zv1l2rb2ysz.us.auth0.com';
const clientId = 'eWFSEdr9SmZ57TPCPYwQ2iLrOF7kbocv';

createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <App />
  </Auth0Provider>
);
