export const FREE_MOBILE_SESSION_KEY = 'free-mobile-session'

const saveToSessionStorage = (value: object, key: string = FREE_MOBILE_SESSION_KEY) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

const updateSessionStorage = (value: object, key: string = FREE_MOBILE_SESSION_KEY) => {
  const existingStorage = getSessionStorage(key)
  saveToSessionStorage({ ...existingStorage, ...value }, key)
}

const getSessionStorage = (key: string = FREE_MOBILE_SESSION_KEY) => {
  const item = typeof window !== 'undefined' && sessionStorage.getItem(key)

  // eslint-disable-next-line
  return item ? JSON.parse(item) : {}
}

const clearSessionStorage = (key: string = FREE_MOBILE_SESSION_KEY) => {
  sessionStorage.removeItem(key)
}

export { saveToSessionStorage, updateSessionStorage, getSessionStorage, clearSessionStorage }
