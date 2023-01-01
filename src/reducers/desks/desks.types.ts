export type DeskOption = {
  value: string
  label: string
}

export type Desk = {
  id: string
  name: string
}

export type DesksState = {
  desks: Desk[]
}
