import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App/App';

import { GameStateProvider } from './components/GameStateProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <GameStateProvider>
      <App />
    </GameStateProvider>
  </React.StrictMode>,
);
