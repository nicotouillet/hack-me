import { ChangeEvent, useState } from 'react'
import { Desk } from '../reducers'
import { useDesks } from '../hooks/useDesks'
import { useEmployees } from '../hooks/useEmployees'

export const Desks = () => {
  const { desks, addDesk } = useDesks()
  const { assignDesksToEmployees } = useEmployees()
  const [deskName, setDeskName] = useState<string>('')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDeskName(event.target.value)
  }

  const resetDeskForm = () => {
    setDeskName('')
  }

  const onAddDesk = () => {
    if (deskName.length === 0) {
      return
    }
    addDesk(deskName)
    resetDeskForm()
  }

  const onAssignDesks = () => {
    assignDesksToEmployees()
  }

  return (
    <div>
      <h1>Desks management page</h1>

      <div>
        <h2>Desks list:</h2>
        <ul>
          {desks.map((desk: Desk, index: number) => (
            <li key={index}>Name: {desk.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Add a new desk:</h2>
        <input type="text" placeholder="Desk name" value={deskName} onChange={onChange} />
        <button onClick={onAddDesk}>Add desk</button>
      </div>

      <div>
        <h2>Assign desks:</h2>
        <button onClick={onAssignDesks}>Assign desks</button>
      </div>
    </div>
  )
}
