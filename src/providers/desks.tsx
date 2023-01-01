import { getSessionStorage, updateSessionStorage } from '../helpers/sessionStorage'
import { createContext } from 'react'

type DesksContextType = {}

const defaultDesksContext: DesksContextType = {}

export const DesksContext = createContext<DesksContextType>(defaultDesksContext)
