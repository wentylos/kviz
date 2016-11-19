import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Overlay from '../../common/components/overlay'
import * as Actions from '../../common/actions'

class App extends Component {
  render() {
    const socket = this.props.socket;

    return (
      <div className="moderator_wrapper">
        <Overlay socket={socket} />
      </div>
    )
  }
}

App.propTypes = {
  socket: PropTypes.object.isRequired,
  gameState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    gameState: state.gameState,
    event: state.event,
    moderator: state.moderator,
    player: state.player
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


