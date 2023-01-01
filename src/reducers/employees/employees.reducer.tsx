import { Reducer } from 'react'
import { Employee, EmployeesState } from './employees.types'
import { E_EMPLOYEES_ACTIONS, EmployeesActions } from './employees.actions'
import { E_SESSION_KEYS, saveToSessionStorage } from '../../helpers/sessionStorage'

export const initialEmployeesState: EmployeesState = {
  employees: []
}

export const employeesReducer: Reducer<EmployeesState, EmployeesActions> = (
  state = initialEmployeesState,
  action: EmployeesActions
): EmployeesState => {
  switch (action.type) {
    case E_EMPLOYEES_ACTIONS.ADD_EMPLOYEE:
      const newEmployees: Employee[] = [...state.employees, action.payload]
      saveToSessionStorage(newEmployees, E_SESSION_KEYS.EMPLOYEES)
      return {
        employees: newEmployees
      }

    case E_EMPLOYEES_ACTIONS.SET_EMPLOYEES:
      return { employees: action.payload }

    default:
      return state
  }
}
