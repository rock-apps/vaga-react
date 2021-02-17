import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Theme from './styles/Theme';
import GlobalStyle from './styles/global';

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <App />
      <GlobalStyle />
    </Theme>
  </React.StrictMode>,
  document.getElementById('root')
);
