'use client'

import type {DialogProps} from '@radix-ui/react-dialog'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

import {useSearch} from './hooks'

export const SearchDialog = (props: DialogProps) => {
  const {search, setSearch, results} = useSearch()

  return (
    <CommandDialog {...props} shouldFilter={false}>
      <CommandInput value={search} onValueChange={setSearch} />
      <CommandList>
        {!results && <CommandEmpty>Search for a note...</CommandEmpty>}
        {results?.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
        {results?.length > 0 && (
          <CommandGroup heading='Results'>
            {results.map((result) => (
              <CommandItem key={result.id}>{result.id}</CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}
