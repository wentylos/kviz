import * as gameState from '../constants/gameState'

/**
 * Detekuje message popisujici aktualni stav aplikace
 *
 * @param currentState
 * @returns string
 */
export function resolveStateMessage(currentState) {
  switch (currentState) {
    case gameState.INIT:
      return 'Čekáme na připojení moderátora.';

    case gameState.MODERATOR_CONNECTED:
      return 'Moderátor připojen';

    case gameState.PLAYER_REGISTRATION:
      return 'Probíhá registrace týmu';

    case gameState.WAITING_FOR_ROUND_START:
      return 'Čekáme na start kola'

    default:
      throw Error(`Unknown game state ${currentState}`)
  }
}
