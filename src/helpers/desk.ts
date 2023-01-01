import { Desk, DeskOption } from '../reducers'
import { v4 as uuidv4 } from 'uuid'
import { MultiValue } from 'react-select'

export const createDesk = (name: string): Desk => {
  return {
    id: uuidv4(),
    name
  }
}

export const buildPreferredDesks = (deskChoices: MultiValue<DeskOption>, desks: Desk[]): string[] => {
  const preferredDesks: string[] = []

  for (const deskChoice of deskChoices) {
    const deskFromList = desks.find((desk: Desk) => desk.id === deskChoice.value)
    if (deskFromList) {
      preferredDesks.push(deskFromList.id)
    }
  }

  return preferredDesks
}
