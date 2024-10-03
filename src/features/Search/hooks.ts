'use client'

import {useEffect, useState} from 'react'

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debouncedValue
}

export const useHotkey = (onTrigger: (_: boolean | ((_: boolean) => boolean)) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'p' && event.metaKey) {
        event.preventDefault()
        onTrigger((prev) => !prev)
      } else if (event.key === 'Escape') {
        onTrigger(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onTrigger])
}
