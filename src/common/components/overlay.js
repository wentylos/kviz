import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { resolveStateMessage } from '../helpers/overlay'
import * as Actions from '../actions'
import * as SocketActions from '../constants/socketEvent'

class Overlay extends Component {
  resolveStateMessage() {
    return resolveStateMessage(this.props.gameState.state);
  }

  componentDidMount() {
    const socket = this.props.socket;

    socket.on(SocketActions.MODERATOR_CONNECTED, () => {
      this.props.actions.onModeratorConnected();
    })

    socket.on(SocketActions.PLAYER_REGISTRATION, () => {
      this.props.actions.onPlayerRegistration();
    })
  }

  render() {
    let message = this.resolveStateMessage();
    let playerInfo = null;

    if (this.props.player) {
      playerInfo = (
        <h3>Hráč: {this.props.player.name} {this.props.player.surname} za tym: {this.props.team.title}</h3>
      );
    }

    return (
      <div className="overlay_wrapper">
        <h1>Hra s: {this.props.event.title}</h1>
        <h2>Stav: {this.props.gameState.state}</h2>
        <div>{message}</div>
        {playerInfo}
        <h3>Dnešní moderator je: {this.props.moderator.title}</h3>
      </div>
    )
  }
}

Overlay.propTypes = {
  actions: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  gameState: PropTypes.object.isRequired,
  moderator: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    gameState: state.gameState,
    event: state.event,
    moderator: state.moderator,
    player: state.player,
    team: state.team,
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
)(Overlay)
