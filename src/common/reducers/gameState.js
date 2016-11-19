import {INIT, MODERATOR_CONNECTED, PLAYER_REGISTRATION} from '../constants/gameState'

const initialState = {
  state: INIT,
}

export default function gameState(state = initialState, action) {
  console.log('processing gameState change', action.type)

  switch (action.type) {
    case MODERATOR_CONNECTED:
      return {
        state: MODERATOR_CONNECTED
      }

    case PLAYER_REGISTRATION:
      return {
        state: PLAYER_REGISTRATION
      }

    default:
      return state
  }
}
