import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalThemeProvider from 'themeNameChange/Theme';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalThemeProvider>
        <App />
      </GlobalThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
