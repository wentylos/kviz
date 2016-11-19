import SocketIo from 'socket.io';
import * as states from '../../common/constants/gameState'
import * as events from '../../common/constants/socketEvent'

let initState = {
  moderator: null,
  gameState: states.INIT,
  nextRoundStartAt: null,
  currentRound: null,
}

export default class SocketHandler {
  constructor(server) {
    this.eventState = [];

    this.io = new SocketIo(server, {path: '/api'});
    this.io.use(function(socket, next){
      // return the result of next() to accept the connection.
      if ('eventId' in socket.handshake.query && parseInt(socket.handshake.query.eventId) > 0) {
        return next();
      }

      // call next() with an Error if you need to reject the connection.
      next(new Error('Missing event id'));
    });

    this.io.on('connection', (socket) => {
      this.init(socket);
    });
  }

  init(socket) {
    console.log('connect ' + socket.handshake.query.eventId + ', id: ' + socket.id);

    socket.join(this.makeEventRoomName(socket.handshake.query.eventId));

    let state = this.getEventState(socket.handshake.query.eventId);

    socket.on(events.MODERATOR_CONNECTED, (data) => {this.moderatorConnected(data)});
    socket.on(events.PLAYER_REGISTRATION, (data) => {this.playerRegistration(data)});
    socket.on(events.ROUND_START, (data) => {this.roundStart(data)});

    console.log('emiting game state', state.gameState);
    socket.emit(events.NEW_STATE, state.gameState);
  }

  moderatorConnected(data) {
    console.log('moderator connected for ' + data.eventId);

    let state = this.getEventState(data.eventId);

    state.moderator = data.moderator;
    state.gameState = states.MODERATOR_CONNECTED;

    this.setEventState(data.eventId, state);
    this.io.sockets.to(this.makeEventRoomName(data.eventId)).emit(events.MODERATOR_CONNECTED);
  }

  playerRegistration(data) {
    console.log('player registration for ', data);

    let state = this.getEventState(data.eventId);
    state.gameState = states.PLAYER_REGISTRATION;
    this.setEventState(data.eventId, state);

    this.io.sockets.to(this.makeEventRoomName(data.eventId)).emit(events.PLAYER_REGISTRATION);
  }

  roundStart(data) {
    console.log('round start for ' + data.eventId + ' in ' + data.time + 'seconds');

    let state = this.getEventState(data.eventId);
    state.gameState = states.WAITING_FOR_ROUND_START;
    state.nextRoundStartAt = new Date(time() + data.time);
    this.setEventState(data.eventId, state);

    this.io.sockets.to(this.makeEventRoomName(data.eventId)).emit(events.NEW_STATE, state);
  }

  /**
   * Vraci stav udalosti
   * @param eventId
   *
   * @returns object @see initState
   */
  getEventState(eventId) {
    let ret = initState;

    if (eventId in this.eventState) {
      ret = this.eventState[eventId];
    }

    return ret;
  }

  /**
   * Nastavi novy stav udalosti
   *
   * @param eventId
   * @param newState
   */
  setEventState(eventId, newState) {
    this.eventState[eventId] = newState;
  }

  /**
   * Vraci nazev mistnosti (room) pro socket.io
   *
   * @param eventId
   * @returns {string}
   */
  makeEventRoomName(eventId) {
    return 'event-' + parseInt(eventId);
  }
}
