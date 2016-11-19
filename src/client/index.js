import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import io from 'socket.io-client';
import App from './containers/app';
import configureStore from './store/index'
import {NEW_STATE} from '../common/constants/socketEvent'

const rootEl = document.getElementById('app-root');
const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);

const socket = io('', { path: '/api', query: 'eventId=' + store.getState().event.id });

socket.on(NEW_STATE, function(data) {
  console.log(`new game state ${data}`);
})

ReactDOM.render(
  <Provider store={store} >
    <App socket={socket} />
  </Provider>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./containers/app', () => {
    const NextApp = require('./containers/app').default; // eslint-disable-line
    ReactDOM.render(
      <Provider store={store} >
        <NextApp socket={socket} />
      </Provider>,
      rootEl
    );
  });
}
