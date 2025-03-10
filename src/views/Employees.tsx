import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Desk, DeskOption, Employee } from '../reducers'
import Select, { MultiValue } from 'react-select'
import { DesksContext } from '../providers/desks'
import { useEmployees } from '../hooks/useEmployees'

export const Employees = () => {
  const { employees, addEmployee } = useEmployees()
  const { desks } = useContext(DesksContext)

  const [desksOptions, setDesksOptions] = useState<DeskOption[]>([])
  const [employeeName, setEmployeeName] = useState<string>('')
  const [employeeEmail, setEmployeeEmail] = useState<string>('')
  const [employeeDesksChoices, setEmployeeDesksChoices] = useState<MultiValue<DeskOption>>([])

  useEffect(() => {
    setDesksOptions(desks.map((desk: Desk) => ({ value: desk.id, label: desk.name })))
  }, [desks])

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setEmployeeName(event.target.value)
  }

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmployeeEmail(event.target.value)
  }

  const onSelectDesksChoice = (newValue: MultiValue<DeskOption>) => {
    setEmployeeDesksChoices(newValue)
  }

  const resetEmployeeForm = () => {
    setEmployeeName('')
    setEmployeeEmail('')
    setEmployeeDesksChoices([])
  }

  const onAddEmployee = () => {
    if (employeeName.length === 0 || employeeEmail.length === 0) {
      return
    }
    addEmployee(employeeName, employeeEmail, employeeDesksChoices)
    resetEmployeeForm()
  }

  return (
    <div>
      <h1>Employees management page</h1>

      <div>
        <h2>Employees list:</h2>
        <ul>
          {employees.map((employee: Employee, index: number) => (
            <li key={index}>
              Name: {employee.name} - Assigned desk: {employee.assignedDesk ? employee.assignedDesk.name : '-'}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Add a new employee:</h2>
        <input type="text" placeholder="Employee name" value={employeeName} onChange={onChangeName} />
        <input type="email" placeholder="Employee email" value={employeeEmail} onChange={onChangeEmail} />
        <Select
          isMulti
          name="employeePreferredDesks"
          options={desksOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          value={employeeDesksChoices}
          onChange={onSelectDesksChoice}
        ></Select>
        <button onClick={onAddEmployee}>Add employee</button>
      </div>
    </div>
  )
}
