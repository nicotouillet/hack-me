import { Employee } from './employees.types'
import { Desk } from '../desks/desks.types'

export enum E_EMPLOYEES_ACTIONS {
  ADD_EMPLOYEE = 'ADD_EMPLOYEE',
  REMOVE_EMPLOYEE = 'REMOVE_EMPLOYEE',
  RESET_EMPLOYEES = 'RESET_EMPLOYEES',
  SET_ASSIGNED_DESK = 'SET_ASSIGNED_DESK',
  SET_EMPLOYEES = 'SET_EMPLOYEES',
  SET_PREFERRED_DESKS = 'SET_PREFERRED_DESKS'
}

type AddEmployee = {
  type: E_EMPLOYEES_ACTIONS.ADD_EMPLOYEE
  payload: Employee
}

type RemoveEmployee = {
  type: E_EMPLOYEES_ACTIONS.REMOVE_EMPLOYEE
  payload: {
    id: string
  }
}

type ResetEmployees = {
  type: E_EMPLOYEES_ACTIONS.RESET_EMPLOYEES
}

type SetEmployees = {
  type: E_EMPLOYEES_ACTIONS.SET_EMPLOYEES
  payload: Employee[]
}

type SetAssignedDesk = {
  type: E_EMPLOYEES_ACTIONS.SET_ASSIGNED_DESK
  payload: {
    desk: Desk
    employee: Employee
  }
}
type SetPreferredDesks = {
  type: E_EMPLOYEES_ACTIONS.SET_PREFERRED_DESKS
  payload: {
    desks: string[]
    employee: Employee
  }
}

export const addEmployee = (employee: Employee): AddEmployee => ({
  type: E_EMPLOYEES_ACTIONS.ADD_EMPLOYEE,
  payload: employee
})

export const removeEmployee = (employee: Employee): RemoveEmployee => ({
  type: E_EMPLOYEES_ACTIONS.REMOVE_EMPLOYEE,
  payload: employee
})

export const resetEmployees = (): ResetEmployees => ({
  type: E_EMPLOYEES_ACTIONS.RESET_EMPLOYEES
})

export const setAssignedDesk = (desk: Desk, employee: Employee): SetAssignedDesk => ({
  type: E_EMPLOYEES_ACTIONS.SET_ASSIGNED_DESK,
  payload: { desk, employee }
})

export const setEmployees = (employees: Employee[]): SetEmployees => ({
  type: E_EMPLOYEES_ACTIONS.SET_EMPLOYEES,
  payload: employees
})

export const setPreferredDesks = (desks: string[], employee: Employee): SetPreferredDesks => ({
  type: E_EMPLOYEES_ACTIONS.SET_PREFERRED_DESKS,
  payload: { desks, employee }
})

export type EmployeesActions =
  | AddEmployee
  | RemoveEmployee
  | ResetEmployees
  | SetAssignedDesk
  | SetEmployees
  | SetPreferredDesks
