import React from 'react';
import path from 'path';
import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux'
import App from '../../client/containers/app';
import configureStore from '../../client/store/index'

export default class Client {
  constructor(storage) {
    this.storage = storage;
  }

  render(req, res) {
    Promise.all([
        //prefetch data
        this.storage.getEvent(req.params.eventId),
        this.storage.getModeratorForEvent(req.params.eventId),
        this.storage.getPlayer(req.params.playerId),
        this.storage.getPlayerTeam(req.params.playerId)
    ]).then((values) => {

      let store = configureStore({
        event: values[0],
        moderator: values[1],
        player: values[2],
        team: values[3],
      });

      let html = ReactDOMServer.renderToString(
        <Provider store={store}>
          <App />
        </Provider>
      );
      console.log(store);
      res.send(this.renderFullPage(html, store));
    }).catch((err) => setImmediate(() => {
      throw err;
    }));
  }

  renderFullPage(html, preloadedState) {
    const isProduction = process.env.NODE_ENV === 'production';

    const buildDir = isProduction ? fs.readdirSync(path.resolve(__dirname, '../../build')) : '';
    const appJS = isProduction ? buildDir.find(file => /^client\-\w+\.js$/.test(file)) : '';
    const appCSS = isProduction ? buildDir.find(file => /^client\-\w+\.css$/.test(file)) : '';
    const scripts = isProduction ? `/build/${appJS}` : '//localhost:8080/build/client.js';
    const css = isProduction ? `<link href={/build/${appCSS}} rel="stylesheet"/>` : '';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charSet="utf-8"/>
          <title>Hospodský kvíz - klient - ${preloadedState.getState().event.title}</title>
          ${css}
        </head>
        <body>
          <div id="app-root">${html}</div>
          <script type="text/javascript">
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState.getState())}
          </script>
          <script src=${scripts} type="text/javascript"></script>
        </body>
      </html>
    `
  }
}
