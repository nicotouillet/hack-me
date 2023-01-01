import { ChangeEvent, useContext, useState } from 'react'
import { DesksContext } from '../providers/desks'
import { Desk, E_DESKS_ACTIONS } from '../reducers'
import { createDesk } from '../helpers/desk'

export const Desks = () => {
  const { desks, dispatch } = useContext(DesksContext)
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

    dispatch({ type: E_DESKS_ACTIONS.ADD_DESK, payload: createDesk(deskName) })
    resetDeskForm()
  }

  return (
    <div>
      <h1>Desks management page</h1>

      <div>
        <h2>Desks list:</h2>
        <ul>
          {desks.map((desk: Desk, index: number) => (
            <li key={index}>{desk.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Add a new desk:</h2>
        <input type="text" placeholder="Desk name" value={deskName} onChange={onChange} />
        <button onClick={onAddDesk}>Add desk</button>
      </div>
    </div>
  )
}
