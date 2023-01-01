import { getSessionStorage, updateSessionStorage } from '../helpers/sessionStorage'
import { createContext } from 'react'

type EmployeesContextType = {}

const defaultEmployeesContext: EmployeesContextType = {}

export const EmployeesContext = createContext<EmployeesContextType>(defaultEmployeesContext)
