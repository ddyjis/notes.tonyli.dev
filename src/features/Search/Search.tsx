'use client'

import {useState} from 'react'

import {Button} from '@/components/ui/button'
import {SearchDialog} from './SearchDialog'
import {useHotkey} from './hooks'

export const Search = () => {
  const [open, setOpen] = useState(false)
  useHotkey(setOpen)

  return (
    <>
      <Button
        variant='outline'
        onClick={() => setOpen(true)}
        className='flex min-w-60 items-center justify-between gap-2'
      >
        Search{' '}
        <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 px-1.5 font-mono text-muted-foreground text-sm opacity-100'>
          <span>⌘</span>P
        </kbd>
      </Button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
