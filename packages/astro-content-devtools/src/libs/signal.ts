import { createEffect, createSignal, type Signal } from 'solid-js'

export function createLocalStorageSignal<TType>(key: string, defaultValue: TType): Signal<TType> {
  const [value, setValue] = createSignal<TType>(defaultValue)

  try {
    const localStorageValue = localStorage.getItem(key)

    if (typeof localStorageValue === 'string') {
      setValue(() => JSON.parse(localStorageValue) as TType)
    }
  } catch {
    // We can safely ignore read errors.
  }

  createEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value()))
    } catch {
      // We can safely ignore write errors.
    }
  })

  return [value, setValue]
}
