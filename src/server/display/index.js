import React from 'react';
import path from 'path';
import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux'
import App from '../../display/containers/app';
import configureStore from '../../display/store/index'

export default class Display {
  constructor(storage) {
    this.storage = storage;
  }

  render(req, res) {
    Promise.all([
        //prefetch data
        this.storage.getEvent(req.params.eventId),
        this.storage.getModeratorForEvent(req.params.eventId),
    ]).then((values) => {
      let store = configureStore({
        event: values[0],
        moderator: values[1],
      });

      let html = ReactDOMServer.renderToString(
        <Provider store={store}>
          <App />
        </Provider>
      );

      res.send(this.renderFullPage(html, store));
    }).catch((err) => setImmediate(() => {
      throw err;
    }));
  }

  renderFullPage(html, preloadedState) {
    const isProduction = process.env.NODE_ENV === 'production';

    const buildDir = isProduction ? fs.readdirSync(path.resolve(__dirname, '../../build')) : '';
    const appJS = isProduction ? buildDir.find(file => /^display\-\w+\.js$/.test(file)) : '';
    const appCSS = isProduction ? buildDir.find(file => /^display\-\w+\.css$/.test(file)) : '';
    const scripts = isProduction ? `/build/${appJS}` : '//localhost:8080/build/display.js';
    const css = isProduction ? `<link href={/build/${appCSS}} rel="stylesheet"/>` : '';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charSet="utf-8"/>
          <title>Hospodský kvíz - display - ${preloadedState.getState().event.title}</title>
          ${css}
        </head>
        <body>
          <div id="app-root">${html}</div>
          <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState.getState())}
          </script>
          <script src=${scripts} type="text/javascript"></script>
        </body>
      </html>
    `
  }
}
