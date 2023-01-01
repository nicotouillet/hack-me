import { useContext, useState } from 'react'
import { Desk, DeskOption, E_EMPLOYEES_ACTIONS, Employee } from '../reducers'
import { buildPreferredDesks } from '../helpers/desk'
import { createEmployee } from '../helpers/employee'
import { EmployeesContext } from '../providers/employees'
import { MultiValue } from 'react-select'
import { DesksContext } from '../providers/desks'

export const useEmployees = () => {
  const { employees, dispatch } = useContext(EmployeesContext)
  const { desks } = useContext(DesksContext)

  const [assigned, setAssigned] = useState<{ [key: string]: string }>({})
  const [assignedDesksIds, setAssignedDesksIds] = useState<string[]>([])
  const [assignedEmployeesIds, setAssignedEmployeesIds] = useState<string[]>([])
  const [firstChoices, setFirstChoices] = useState<{ [employeesIds: string]: string }>({})
  const [employeesIdsWithoutChoices, setEmployeesIdsWithoutChoices] = useState<string[]>([])
  const [uniqueFirstChoices, setUniqueFirstChoices] = useState<string[]>([])
  const [shouldContinue, setShouldContinue] = useState<boolean>(true)

  const addEmployee = (name: string, email: string, desksChoices: MultiValue<DeskOption>) =>
    dispatch({
      type: E_EMPLOYEES_ACTIONS.ADD_EMPLOYEE,
      payload: createEmployee(name, email, buildPreferredDesks(desksChoices, desks))
    })

  const assignDesks = () => {
    for (const employee of employees) {
      if (employee.preferredDesksIds.length === 0) {
        setEmployeesIdsWithoutChoices([...employeesIdsWithoutChoices, employee.id])
        continue
      }

      fillFirstChoices(employee)
    }

    while (shouldContinue) {
      if (assignedDesksIds.length > 0) {
        setFirstChoices({})
        setUniqueFirstChoices([])
      }

      for (const employee of employees) {
        fillFirstChoices(employee)
      }

      fillUniqueChoices()

      for (const [employeeId, deskId] of Object.entries(firstChoices)) {
        if (uniqueFirstChoices.indexOf(deskId) === -1) {
          continue
        }

        fillAssignedDesks(employeeId, deskId)
      }

      for (const employee of employees) {
        if (employee.preferredDesksIds.length > 0) {
          setShouldContinue(false)
          break
        }
      }
    }

    while (assignedDesksIds.length < desks.length) {
      for (const employeeId of employeesIdsWithoutChoices) {
        const availableDeskId = findAvailableDeskId(desks, assignedDesksIds)
        if (availableDeskId) {
          fillAssignedDesks(employeeId, availableDeskId)
        }
      }
    }
  }

  const fillFirstChoices = (employee: Employee) => {
    const deskId = employee.preferredDesksIds.shift()
    if (deskId) {
      setFirstChoices({ ...firstChoices, [employee.id]: deskId })
    }
  }

  const fillUniqueChoices = () => {
    for (const desk of Object.values(firstChoices)) {
      const deskIndex = uniqueFirstChoices.indexOf(desk)
      if (deskIndex === -1) {
        setUniqueFirstChoices([...uniqueFirstChoices, desk])
      } else {
        setUniqueFirstChoices(uniqueFirstChoices.splice(deskIndex, 1))
      }
    }
  }

  const findAvailableDeskId = (desks: Desk[], assignedDesks: string[]): string | null => {
    for (const desk of desks) {
      if (assignedDesks.indexOf(desk.id) === -1) {
        return desk.id
      }
    }
    return null
  }

  const fillAssignedDesks = (employeeId: string, deskId: string) => {
    setAssignedDesksIds([...assignedDesksIds, deskId])
    setAssignedEmployeesIds([...assignedEmployeesIds, employeeId])
    setAssigned({ ...assigned, [employeeId]: deskId })
  }

  return {
    employees,
    addEmployee,
    assignDesks
  }
}
