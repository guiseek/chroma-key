function handleState<T>(data: T) {
  let state: T | null = data
  // const events: ((state: T) => void)[] = []
  const events = new Set<(state: T | null) => void>()

  return {
    set(newState: T | null) {
      if (newState === null) {
        state = null
      } else {
        state = { ...state, ...newState }
      }
      events.forEach((cb) => cb(state))
      return this
    },
    pick<K extends keyof T>(key: K): T[K] | null {
      return state && state[key] ? state[key] : null
    },
    get() {
      return Object.freeze(state)
    },
    on(cb: (state: T | null) => void) {
      events.add(cb)
      return this
    },
    off(cb: (state: T | null) => void) {
      events.delete(cb)
      return this
    },
  }
}

let stateHandler: ReturnType<typeof handleState>

const getStateHandler = <T>(data: T | null = null) => {
  if (!stateHandler) {
    stateHandler = handleState(data)
  }

  return stateHandler as ReturnType<typeof handleState<T>>
}

export default getStateHandler
