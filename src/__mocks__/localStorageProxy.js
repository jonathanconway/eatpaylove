const store = {}

export const getItem = (key) => (store[key] || null)

export const setItem = (key, value) => (store[key] = value.toString())

global.localStorage = { getItem, setItem }