export enum E_SESSION_KEYS {
  DESKS = 'desks-session',
  EMPLOYEES = 'employees-session'
}

const saveToSessionStorage = (value: object, key: E_SESSION_KEYS) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

const getSessionStorage = (key: E_SESSION_KEYS) => {
  const item = typeof window !== 'undefined' && sessionStorage.getItem(key)

  // eslint-disable-next-line
  return item ? JSON.parse(item) : {}
}

const clearSessionStorage = (key: E_SESSION_KEYS) => {
  sessionStorage.removeItem(key)
}

export { saveToSessionStorage, getSessionStorage, clearSessionStorage }
