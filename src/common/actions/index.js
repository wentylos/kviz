import * as types from '../constants/gameState'

export function onModeratorConnected() {
  return {
    type: types.MODERATOR_CONNECTED
  }
}

export function onPlayerRegistration() {
  return {
    type: types.PLAYER_REGISTRATION
  }
}
