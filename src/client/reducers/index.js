import { combineReducers } from 'redux'
import event from '../../common/reducers/event'
import player from '../../common/reducers/player'
import moderator from '../../common/reducers/moderator'
import gameState from '../../common/reducers/gameState'
import team from '../../common/reducers/team'

const rootReducer = combineReducers({
  event,
  player,
  moderator,
  gameState,
  team,
})

export default rootReducer
