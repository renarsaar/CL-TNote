import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import ResizerProvider from './context/ResizerContext';
import ConfigsProvider from './context/ConfigContext';
import ActiveTooltipProvider from './context/ActiveTooltipContext';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigsProvider>
        <ResizerProvider>
          <ActiveTooltipProvider>
            <App />
          </ActiveTooltipProvider>
        </ResizerProvider>
      </ConfigsProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
