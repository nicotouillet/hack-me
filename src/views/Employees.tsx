import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Desk, E_EMPLOYEES_ACTIONS, Employee } from '../reducers'
import { EmployeesContext } from '../providers/employees'
import { v4 as uuidv4 } from 'uuid'
import Select, { MultiValue } from 'react-select'
import { DesksContext } from '../providers/desks'

export type DeskOption = {
  value: string
  label: string
}

export const Employees = () => {
  const { employees, dispatch } = useContext(EmployeesContext)
  const { desks } = useContext(DesksContext)

  const [desksOptions, setDesksOptions] = useState<DeskOption[]>([])
  const [employeeName, setEmployeeName] = useState<string>('')
  const [employeeEmail, setEmployeeEmail] = useState<string>('')
  const [employeePreferredDesks, setEmployeePreferredDesks] = useState<Desk[]>([])

  useEffect(() => {
    setDesksOptions(desks.map((desk: Desk) => ({ value: desk.id, label: desk.name })))
  }, [desks])

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setEmployeeName(event.target.value)
  }

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmployeeEmail(event.target.value)
  }

  const onChangePreferredDesks = (newValue: MultiValue<DeskOption>) => {
    setEmployeePreferredDesks(newValue.map((deskValue: DeskOption) => ({ id: deskValue.value, name: deskValue.label })))
  }

  const resetEmployeeForm = () => {
    setEmployeeName('')
    setEmployeeEmail('')
    setEmployeePreferredDesks([])
  }

  const onAddEmployee = () => {
    if (employeeName.length === 0 || employeeEmail.length === 0 || employeePreferredDesks.length === 0) {
      return
    }

    dispatch({
      type: E_EMPLOYEES_ACTIONS.ADD_EMPLOYEE,
      payload: { id: uuidv4(), name: employeeName, email: employeeEmail, preferredDesks: employeePreferredDesks }
    })

    resetEmployeeForm()
  }

  return (
    <div>
      <h1>Employees management page</h1>

      <div>
        <h2>Employees list:</h2>
        <ul>
          {employees.map((employee: Employee, index: number) => (
            <li key={index}>{employee.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Add a new employee:</h2>
        <input type="text" placeholder="Employee name" value={employeeName} onChange={onChangeName} />
        <input type="text" placeholder="Desk name" value={employeeEmail} onChange={onChangeEmail} />
        <Select
          isMulti
          name="employeePreferredDesks"
          options={desksOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={onChangePreferredDesks}
        ></Select>
        <button onClick={onAddEmployee}>Add employee</button>
      </div>
    </div>
  )
}
