'use client'

import type {DialogProps} from '@radix-ui/react-dialog'
import {VisuallyHidden} from '@radix-ui/react-visually-hidden'
import {useRouter} from 'next/navigation'
import {type ComponentProps, useEffect, useRef, useState} from 'react'

import {metadata} from '@/app/metadata'
import {Button} from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {DialogTitle} from '@/components/ui/dialog'
import {useHistory} from '@/features/History'
import {MdxComponent} from '@/features/Note'

import {useHotkey, useSearch} from './hooks'

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
        <kbd className='pointer-events-none inline-flex course-pointer:hidden h-5 select-none items-center gap-1 px-1.5 font-mono text-muted-foreground text-sm opacity-100'>
          <span>⌘</span>P
        </kbd>
      </Button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  )
}

const SearchDialog = (props: DialogProps) => {
  const router = useRouter()
  const handleSelect = (id: string) => {
    props.onOpenChange(false)
    router.push(`/${id}`)
  }
  const [query, setQuery] = useState('')
  const previousQueryRef = useRef('')
  const [shouldTriggerSearch, setShouldTriggerSearch] = useState(false)

  useEffect(() => {
    if (query !== previousQueryRef.current) {
      setShouldTriggerSearch(false)
    }
  }, [query])

  return (
    <CommandDialog {...props} shouldFilter={false}>
      <VisuallyHidden>
        <DialogTitle>Algolia Search</DialogTitle>
      </VisuallyHidden>
      <CommandInput
        value={query}
        onValueChange={(value) => {
          setQuery(value)
          setShouldTriggerSearch(false)
        }}
        onSearchClick={() => {
          setShouldTriggerSearch(true)
          previousQueryRef.current = query
        }}
      />
      <CommandList className='max-h-[600px]'>
        <SearchResults
          query={shouldTriggerSearch ? query : previousQueryRef.current}
          onItemSelect={handleSelect}
        />
      </CommandList>
    </CommandDialog>
  )
}

type SearchResultsProps = {query: string; onItemSelect: (_: string) => void}
const SearchResults = ({query, onItemSelect}: SearchResultsProps) => {
  const {data, status, error} = useSearch(query)

  if (!query) return <HistoryGroup onItemSelect={onItemSelect} />
  if (status === 'loading') return <CommandEmpty>Loading...</CommandEmpty>
  if (status === 'error') return <CommandEmpty>Error: {error}</CommandEmpty>
  if (data.length === 0) return <CommandEmpty>No results found.</CommandEmpty>

  return (
    <CommandGroup heading='Results'>
      {data.map((item) => (
        <CommandItem
          key={item.id}
          onSelect={() => onItemSelect(item.id)}
          className='flex flex-col gap-1'
        >
          <h1 className='font-bold text-lg'>{item.frontmatter.title}</h1>
          <MdxComponent code={item.code} />
        </CommandItem>
      ))}
    </CommandGroup>
  )
}

type HistoryGroupProps = {onItemSelect: (_: string) => void}
const HistoryGroup = ({onItemSelect}: HistoryGroupProps) => {
  const history = useHistory()
  if (history.length === 0) return null
  return (
    <CommandGroup heading='History'>
      {history.slice(0, 10).map((item) => (
        <HistoryItem key={item.id} id={item.id} onSelect={() => onItemSelect(item.id)} />
      ))}
    </CommandGroup>
  )
}

type HistoryItemProps = ComponentProps<typeof CommandItem> & {id: string}
const HistoryItem = ({id, ...props}: HistoryItemProps) => {
  const {frontmatter} = metadata.notes[id] ?? {}
  if (!frontmatter) return null
  return <CommandItem {...props}>{frontmatter.title}</CommandItem>
}
