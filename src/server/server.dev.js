import React from 'react';
import express from 'express';
import compression from 'compression';
import Database from './database/index';

import Client from './client/index';
import Moderator from './moderator/index';
import Display from './display/index';
import SocketHandler from './socket/index';

process.on('uncaughtException', function (err) {
  console.log(err);
});

let storage = new Database({
  host     : 'localhost',
  user     : 'kviz',
  password : 'sUEqz7dqeb6TjZrC',
  database : 'kviz'
});

const app = express();

app.use(compression());
app.use('/build', express.static('build'));

app.get('/:eventId(\\d+)/:playerId(\\d+)', (req, res) => {
  new Client(storage).render(req, res);
});

app.get('/moderator/:eventId(\\d+)/:moderatorId(\\d+)', (req, res) => {
  new Moderator(storage).render(req, res);
});

app.get('/display/:eventId(\\d+)', (req, res) => {
  new Display(storage).render(req, res);
});

const port = process.env.PORT || 8000;

const server = app.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('server listening on port: %s', port);
});

new SocketHandler(server);



