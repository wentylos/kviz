import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';
import { Provider } from 'react-redux'
import io from 'socket.io-client';
import configureStore from './store/index'
import {NEW_STATE, MODERATOR_CONNECTED} from '../common/constants/socketEvent'

const rootEl = document.getElementById('app-root');
const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);

const socket = io('', { path: '/api', query: 'eventId=' + store.getState().event.id });

socket.on(NEW_STATE, function(data) {
  console.log(data);
})

socket.on('connect', () => {
  socket.emit(MODERATOR_CONNECTED, {
    'eventId': store.getState().event.id,
  });
});

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
