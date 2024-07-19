'use client'

import {useUpdateFrontmatterCache} from './hooks'
import type {FrontmatterCache as FrontmatterCacheType} from './types'

namespace FrontmatterCache {
  export type Props = {
    data: FrontmatterCacheType
  }
}

export const FrontmatterCache = ({data}: FrontmatterCache.Props) => {
  useUpdateFrontmatterCache(data)
  return null
}
