import { useContext } from 'react'
import { DesksContext } from '../providers/desks'
import { E_DESKS_ACTIONS } from '../reducers'
import { createDesk } from '../helpers/desk'

export const useDesks = () => {
  const { desks, dispatch } = useContext(DesksContext)

  const addDesk = (name: string) => dispatch({ type: E_DESKS_ACTIONS.ADD_DESK, payload: createDesk(name) })

  return {
    desks,
    addDesk
  }
}
