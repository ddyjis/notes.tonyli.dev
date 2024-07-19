'use client'

import {useEffect, useState} from 'react'

import type {FrontmatterCache} from './types'

export const useFrontmatterCache = () => {
  const [frontmatterCache, setFrontmatterCache] = useState<FrontmatterCache>({})
  useEffect(() => {
    setFrontmatterCache(JSON.parse(localStorage.getItem('frontmatterCache') || '{}'))
  }, [])
  return frontmatterCache
}

export const useUpdateFrontmatterCache = (data: FrontmatterCache) => {
  useEffect(() => {
    localStorage.setItem('frontmatterCache', JSON.stringify(data))
  }, [data])
}
