import types from './types'

const INITIAL_STATE = {
  username: 'cutemachine',
  // VALID, INVALID, VALIDATING, UNCHECKED
  usernameStatus: 'UNCHECKED',
  errorMessage: '',
  reputation: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USERNAME_STATUS_CHANGED:
      return { ...state, usernameStatus: action.usernameStatus }

    case types.USERNAME_CHANGED:
      return { ...state, username: action.username, usernameStatus: 'UNCHECKED', errorMessage: '', reputation: '' }

    case types.REPUTATION_SET:
      return { ...state, reputation: action.reputation }

    case types.ERROR_CLEARED:
    case types.ERROR_OCCURRED:
      return { ...state, errorMessage: action.errorMessage }

    default:
      return state
  }
}