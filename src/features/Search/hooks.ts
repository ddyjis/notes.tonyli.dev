'use client'

import {useEffect, useState} from 'react'

import type {SearchResult} from '@/app/api/search/route'

export const useSearch = () => {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [results, setResults] = useState<SearchResult[] | undefined>(undefined)
  // debounce search
  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)
    return () => clearTimeout(debouncedSearch)
  }, [search])
  // fetch results
  useEffect(() => {
    const searchFn = async () => {
      const response = await fetch(`/api/search?q=${debouncedSearch}`)
      const results = (await response.json()) as SearchResult[]
      setResults(results)
    }
    if (debouncedSearch) {
      searchFn()
    } else {
      setResults(undefined)
    }
  }, [debouncedSearch])

  return {search, setSearch, results}
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
