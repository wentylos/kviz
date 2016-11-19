import { combineReducers } from 'redux'
import event from '../../common/reducers/event'
import moderator from '../../common/reducers/moderator'
import gameState from '../../common/reducers/gameState'

const rootReducer = combineReducers({
  event,
  moderator,
  gameState,
})

export default rootReducer
