import { Desk, DesksState } from './desks.types'
import { Reducer } from 'react'
import { DesksActions, E_DESKS_ACTIONS } from './desks.actions'
import { E_SESSION_KEYS, saveToSessionStorage } from '../../helpers/sessionStorage'

export const initialDesksState: DesksState = {
  desks: []
}

export const desksReducer: Reducer<DesksState, DesksActions> = (
  state = initialDesksState,
  action: DesksActions
): DesksState => {
  switch (action.type) {
    case E_DESKS_ACTIONS.ADD_DESK:
      const newDesks: Desk[] = [...state.desks, action.payload]
      saveToSessionStorage(newDesks, E_SESSION_KEYS.DESKS)
      return {
        desks: newDesks
      }

    case E_DESKS_ACTIONS.SET_DESKS:
      return {
        desks: action.payload
      }

    default:
      return state
  }
}
