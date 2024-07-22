'use client'

import type {DialogProps} from '@radix-ui/react-dialog'
import {VisuallyHidden} from '@radix-ui/react-visually-hidden'
import algoliasearch from 'algoliasearch/lite'
import {useRouter} from 'next/navigation'
import {type ComponentProps, useEffect, useState} from 'react'
import {Highlight, useHits, useInstantSearch, useSearchBox} from 'react-instantsearch'
import {InstantSearchNext} from 'react-instantsearch-nextjs'

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
  return (
    <CommandDialog {...props} shouldFilter={false}>
      <VisuallyHidden>
        <DialogTitle>Algolia Search</DialogTitle>
      </VisuallyHidden>
      <InstantSearchNext indexName='notes' searchClient={client}>
        <SearchInput />
        <CommandList className='max-h-[600px]'>
          <SearchResults onItemSelect={handleSelect} />
        </CommandList>
      </InstantSearchNext>
    </CommandDialog>
  )
}

const SearchInput = () => {
  const {refine} = useSearchBox()
  const [search, setSearch] = useState('')
  useEffect(() => {
    const debouncedRefine = setTimeout(() => refine(search), 500)
    return () => clearTimeout(debouncedRefine)
  }, [search, refine])

  return <CommandInput value={search} onValueChange={setSearch} />
}

type SearchResultsProps = {onItemSelect: (_: string) => void}
const SearchResults = ({onItemSelect}: SearchResultsProps) => {
  const {items} = useHits()
  const {query} = useSearchBox()
  const {status, results, error} = useInstantSearch()

  if (!query) return <HistoryGroup onItemSelect={onItemSelect} />
  if (status === 'loading') return <CommandEmpty>Loading...</CommandEmpty>
  if (status === 'error') return <CommandEmpty>Error: {error.message}</CommandEmpty>
  if (status === 'stalled') return <CommandEmpty>Searching...</CommandEmpty>
  if (results?.nbHits === 0) return <CommandEmpty>No results found.</CommandEmpty>

  return (
    <CommandGroup heading='Results'>
      {items.map((item) => (
        <CommandItem
          key={item.objectID}
          onSelect={() => onItemSelect(item.objectID)}
          className='flex flex-col gap-1'
        >
          <h1 className='font-bold text-lg'>{item.title}</h1>
          <Highlight attribute='document' hit={item} />
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

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
)
