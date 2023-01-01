import { Desk, Employee } from '../reducers'
import { v4 as uuidv4 } from 'uuid'

export const createEmployee = (name: string, email: string, preferredDesks: Desk[]): Employee => {
  return {
    id: uuidv4(),
    name,
    email,
    preferredDesks
  }
}
