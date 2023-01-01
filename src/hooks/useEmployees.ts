import { useContext } from 'react'
import { Desk, DeskOption, E_EMPLOYEES_ACTIONS, Employee } from '../reducers'
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

  const assignDesksToEmployees = (): Employee[] => {
    let assigned: { [key: string]: string } = {}
    let assignedDesksIds: string[] = []
    const employeesIdsWithoutChoices: string[] = []
    let firstChoices: { [employeesIds: string]: string } = {}
    let shouldContinue: boolean = true
    let uniqueFirstChoices: string[] = []
    let notAssignedEmployees: Employee[] = []

    for (const employee of employees) {
      if (employee.preferredDesksIds.length === 0) {
        employeesIdsWithoutChoices.push(employee.id)
        continue
      }

      const deskId = employee.preferredDesksIds.shift()
      if (deskId) {
        firstChoices[employee.id] = deskId
      }
    }

    return []

    while (shouldContinue) {
      if (assignedDesksIds.length > 0) {
        firstChoices = {}
        uniqueFirstChoices = []
      }

      for (const employee of employees) {
        const deskId = employee.preferredDesksIds.shift()
        if (deskId) {
          // @ts-ignore
          firstChoices[employee.id] = deskId
        }
      }

      console.log(firstChoices)

      for (const desk of Object.values(firstChoices)) {
        const deskIndex = uniqueFirstChoices.indexOf(desk)
        if (deskIndex === -1) {
          uniqueFirstChoices.push(desk)
        } else {
          uniqueFirstChoices = uniqueFirstChoices.splice(deskIndex, 1)
        }
      }

      for (const [employeeId, deskId] of Object.entries(firstChoices)) {
        if (uniqueFirstChoices.indexOf(deskId) === -1) {
          continue
        }

        assignedDesksIds.push(deskId)
        assigned[employeeId] = deskId
      }

      for (const employee of employees) {
        if (employee.preferredDesksIds.length > 0) {
          shouldContinue = false
          break
        }
      }
    }

    while (assignedDesksIds.length < desks.length) {
      for (const employeeId of employeesIdsWithoutChoices) {
        const availableDeskId = findAvailableDeskId(desks, assignedDesksIds)
        if (availableDeskId === null) {
          continue
        }
        assignedDesksIds.push(availableDeskId)
        assigned[employeeId] = availableDeskId
      }
    }

    for (const employee of employees) {
      const assignedDeskId = assigned[employee.id]
      if (!assignedDeskId) {
        notAssignedEmployees.push(employee)
        break
      }

      const desk = findDeskFromId(assignedDeskId)
      if (!desk) {
        break
      }

      dispatch({ type: E_EMPLOYEES_ACTIONS.SET_ASSIGNED_DESK, payload: { employeeId: employee.id, desk } })
    }

    return notAssignedEmployees
  }

  const findDeskFromId = (deskId: string): Desk | undefined => desks.find((desk: Desk) => (desk.id = deskId))

  const findAvailableDeskId = (desks: Desk[], assignedDesks: string[]): string | null => {
    for (const desk of desks) {
      if (assignedDesks.indexOf(desk.id) === -1) {
        return desk.id
      }
    }
    return null
  }

  return {
    employees,
    addEmployee,
    assignDesksToEmployees
  }
}
