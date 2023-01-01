import { createContext, Dispatch, ReactNode, useEffect, useMemo, useReducer } from 'react'
import { Desk, DesksActions, desksReducer, E_DESKS_ACTIONS, initialDesksState } from '../reducers'
import { E_SESSION_KEYS, getSessionStorage } from '../helpers/sessionStorage'

type DesksContextType = {
  desks: Desk[]
  dispatch: Dispatch<DesksActions>
}

const defaultDesksContext: DesksContextType = {
  ...initialDesksState,
  dispatch: () => null
}

export const DesksContext = createContext<DesksContextType>(defaultDesksContext)

type DesksProviderProps = {
  children: ReactNode
}

export const DesksProvider = ({ children }: DesksProviderProps) => {
  const [state, dispatch] = useReducer(desksReducer, initialDesksState)

  const sessionDesks = useMemo(() => getSessionStorage(E_SESSION_KEYS.DESKS), []) as Desk[]

  useEffect(() => {
    if (sessionDesks.length > 0) {
      dispatch({ type: E_DESKS_ACTIONS.SET_DESKS, payload: sessionDesks })
    }
  }, [sessionDesks])

  const value: DesksContextType = useMemo(() => ({ ...state, dispatch }), [state])

  return <DesksContext.Provider value={value}>{children}</DesksContext.Provider>
}
