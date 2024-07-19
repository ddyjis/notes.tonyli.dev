'use client'

import {useEffect, useState} from 'react'

import type {HistoryItem} from './types'

export const useUpdateHistory = (id: string) => {
  useEffect(() => {
    if (!id || id === 'index') return
    const history = JSON.parse(localStorage.getItem('history') || '[]') as HistoryItem[]
    const otherHistory = history.filter((item) => item.id !== id)
    const newHistory = [{id, timestamp: Date.now()}, ...otherHistory]
    localStorage.setItem('history', JSON.stringify(newHistory))
  }, [id])
}

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([])
  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem('history') || '[]') as HistoryItem[])
  }, [])
  return history
}
