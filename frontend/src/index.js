import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { createGlobalStyle } from 'styled-components';

import rootReducer from './modules';
import Root from './Root';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <GlobalStyle />
      <Root />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
