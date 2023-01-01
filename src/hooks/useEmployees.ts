import { useContext } from 'react'
import { DeskOption, E_EMPLOYEES_ACTIONS } from '../reducers'
import { buildPreferredDesks } from '../helpers/desk'
import { createEmployee } from '../helpers/employee'
import { EmployeesContext } from '../providers/employees'
import { MultiValue } from 'react-select'
import { DesksContext } from '../providers/desks'

export const useEmployees = () => {
  const { employees, dispatch } = useContext(EmployeesContext)
  const { desks } = useContext(DesksContext)

  const addEmployee = (name: string, email: string, desksChoices: MultiValue<DeskOption>) =>
    dispatch({
      type: E_EMPLOYEES_ACTIONS.ADD_EMPLOYEE,
      payload: createEmployee(name, email, buildPreferredDesks(desksChoices, desks))
    })

  const assignDesks = () => {
    let assigned: any = {}
    const assignedDesks: string[] = []
    const assignedEmployees: string[] = []
    let firstChoices: any = {}
    const noChoices: string[] = []
    let uniqueFirstChoices: string[] = []

    for (const employee of employees) {
      if (employee.preferredDesks.length === 0) {
        noChoices.push(employee.id)
        continue
      }

      firstChoices[employee.id] = employee.preferredDesks[0]
    }

    for (const desk of Object.values(firstChoices)) {
      const deskIndex = uniqueFirstChoices.indexOf(desk as string)
      if (deskIndex === -1) {
        uniqueFirstChoices.push(desk as string)
      } else {
        uniqueFirstChoices = uniqueFirstChoices.splice(deskIndex, 1)
      }
    }

    for (const [employee, desk] of Object.entries(firstChoices)) {
      if (uniqueFirstChoices.indexOf(desk as string) >= 0) {
        assignedDesks.push(desk as string)
        assignedEmployees.push(employee)
        assigned[employee] = desk
      }
    }
  }

  return {
    employees,
    addEmployee,
    assignDesks
  }
}
