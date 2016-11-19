import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ROUND_IN_PROGRESS, RESULTS } from '../../common/constants/gameState'

import Questions from '../components/questions'
import Results from '../components/results'
import Overlay from '../../common/components/overlay'

import * as Actions from '../../common/actions'

class App extends Component {
  render() {
    const socket = this.props.socket;

    let html = null;

    switch (this.props.gameState.state) {
      case ROUND_IN_PROGRESS:
        html = (
          <Questions socket={socket} />
        );

        break;

      case RESULTS:
        html = (
          <Results />
        );

        break;

      default:
        html = (
          <Overlay socket={socket} />
        );
    }

    return (
      <div className="client_wrapper">
        {html}
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



