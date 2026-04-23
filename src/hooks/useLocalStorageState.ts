import { useEffect, useState } from 'react'

type InitialValue<T> = T | (() => T)

function getInitialValue<T>(initialValue: InitialValue<T>) {
  return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue
}

export function useLocalStorageState<T>(key: string, initialValue: InitialValue<T>) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return getInitialValue(initialValue)

    try {
      const raw = window.localStorage.getItem(key)
      if (raw == null) return getInitialValue(initialValue)
      return JSON.parse(raw) as T
    } catch {
      return getInitialValue(initialValue)
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state))
    } catch {
      // ignore write errors (e.g. storage full, disabled)
    }
  }, [key, state])

  return [state, setState] as const
}

