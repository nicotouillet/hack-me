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
  let newEmployees: Employee[] = []

  switch (action.type) {
    case E_EMPLOYEES_ACTIONS.ADD_EMPLOYEE:
      newEmployees = [...state.employees, action.payload]
      saveToSessionStorage(newEmployees, E_SESSION_KEYS.EMPLOYEES)
      return {
        employees: newEmployees
      }

    case E_EMPLOYEES_ACTIONS.SET_ASSIGNED_DESK:
      const employeeIndex: number = state.employees.findIndex(
        (employee: Employee) => employee.id === action.payload.employeeId
      )

      if (employeeIndex === -1) {
        return {
          employees: state.employees
        }
      }

      newEmployees = [...state.employees]
      newEmployees[employeeIndex] = { ...state.employees[employeeIndex], assignedDesk: action.payload.desk }

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
