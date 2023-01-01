import { Desk } from './desks.types'

export enum E_DESKS_ACTIONS {
  ADD_DESK = 'ADD_DESK',
  REMOVE_DESK = 'REMOVE_DESK',
  RESET_DESKS = 'RESET_DESKS',
  SET_DESK_NAME = 'SET_DESK_NAME',
  SET_DESKS = 'SET_DESKS'
}

type AddDesk = {
  type: E_DESKS_ACTIONS.ADD_DESK
  payload: Desk
}

type RemoveDesk = {
  type: E_DESKS_ACTIONS.REMOVE_DESK
  payload: {
    id: string
  }
}

type ResetDesks = {
  type: E_DESKS_ACTIONS.RESET_DESKS
}

type SetDeskName = {
  type: E_DESKS_ACTIONS.SET_DESK_NAME
  payload: Desk
}
type SetDesks = {
  type: E_DESKS_ACTIONS.SET_DESKS
  payload: Desk[]
}

export const addDesk = (desk: Desk): AddDesk => ({
  type: E_DESKS_ACTIONS.ADD_DESK,
  payload: desk
})

export const removeDesk = (desk: Desk): RemoveDesk => ({
  type: E_DESKS_ACTIONS.REMOVE_DESK,
  payload: desk
})

export const resetDesks = (): ResetDesks => ({
  type: E_DESKS_ACTIONS.RESET_DESKS
})

export const setDeskName = (desk: Desk): SetDeskName => ({
  type: E_DESKS_ACTIONS.SET_DESK_NAME,
  payload: desk
})

export const setDesks = (desks: Desk[]): SetDesks => ({
  type: E_DESKS_ACTIONS.SET_DESKS,
  payload: desks
})

export type DesksActions = AddDesk | RemoveDesk | ResetDesks | SetDeskName | SetDesks
