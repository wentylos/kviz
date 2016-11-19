import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../common/actions'
import * as SocketActions from '../../common/constants/socketEvent'

class App extends Component {
  componentDidMount() {
    const socket = this.props.socket;

    socket.on(SocketActions.MODERATOR_CONNECTED, () => {
      this.props.actions.onModeratorConnected();
    })

    socket.on(SocketActions.PLAYER_REGISTRATION, () => {
      this.props.actions.onPlayerRegistration();
    })
  }

  handlePresentationStart() {
    console.log(this.props.event);
    this.props.socket.emit(SocketActions.PLAYER_REGISTRATION, {eventId: this.props.event.id});

    this.props.actions.onPlayerRegistration();
  }

  handleGameStart() {
    alert('Not implemented.');
  }

  render() {
    return (
      <div className="moderator_wrapper">
        <h1>Hra: {this.props.event.title}</h1>
        <h2>Stav: {this.props.gameState.state}</h2>
        <h3>Dnešní moderator je: {this.props.moderator.title}</h3>
        <button
          onClick={this.handlePresentationStart.bind(this)}
        >
          Docházka/Účast hráčů
        </button>
        <button
          onClick={this.handleGameStart.bind(this)}
        >
          Start hry
        </button>
        <p>TODO seznam tymu, vyznaceni prihlasenych, a jejich hracu a provedeni dochazky</p>
      </div>
    )
  }
}

App.propTypes = {
  socket: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  gameState: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    gameState: state.gameState,
    event: state.event,
    moderator: state.moderator,
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


