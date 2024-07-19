'use client'

import type {HistoryItem} from './types'

export const useUpdateHistory = (id: string) => {
  if (!id || id === 'index') return
  const history = useHistory()
  const otherHistory = history.filter((item) => item.id !== id)
  const newHistory = [{id, timestamp: Date.now()}, ...otherHistory]
  localStorage.setItem('history', JSON.stringify(newHistory))
}

export const useHistory = () => JSON.parse(localStorage.getItem('history') || '[]') as HistoryItem[]
