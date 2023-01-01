import { createContext, Dispatch, ReactNode, useEffect, useMemo, useReducer } from 'react'
import { E_EMPLOYEES_ACTIONS, Employee, EmployeesActions, employeesReducer, initialEmployeesState } from '../reducers'
import { E_SESSION_KEYS, getSessionStorage } from '../helpers/sessionStorage'

type EmployeesContextType = {
  employees: Employee[]
  dispatch: Dispatch<EmployeesActions>
}

const defaultEmployeesContext: EmployeesContextType = {
  ...initialEmployeesState,
  dispatch: () => null
}

export const EmployeesContext = createContext<EmployeesContextType>(defaultEmployeesContext)

type EmployeesProviderProps = {
  children: ReactNode
}

export const EmployeesProvider = ({ children }: EmployeesProviderProps) => {
  const [state, dispatch] = useReducer(employeesReducer, initialEmployeesState)

  const sessionEmployees = useMemo(() => getSessionStorage(E_SESSION_KEYS.EMPLOYEES), []) as Employee[]

  useEffect(() => {
    if (sessionEmployees.length > 0) {
      dispatch({ type: E_EMPLOYEES_ACTIONS.SET_EMPLOYEES, payload: sessionEmployees })
    }
  }, [sessionEmployees])

  const value: EmployeesContextType = useMemo(() => ({ ...state, dispatch }), [state])

  return <EmployeesContext.Provider value={value}>{children}</EmployeesContext.Provider>
}
