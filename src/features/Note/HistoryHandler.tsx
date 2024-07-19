'use client'

import {useUpdateHistory} from '@/features/History'

namespace HistoryHandler {
  export type Props = {
    id: string
  }
}
export const HistoryHandler = ({id}: HistoryHandler.Props) => {
  useUpdateHistory(id)
  return null
}
