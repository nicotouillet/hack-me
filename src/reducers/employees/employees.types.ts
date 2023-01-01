import { Desk } from '../desks/desks.types'

export type Employee = {
  id: string
  name: string
  email: string
  preferredDesksIds: string[]
  assignedDesk?: Desk
}

export type EmployeesState = {
  employees: Employee[]
}
