'use client'

import type {DialogProps} from '@radix-ui/react-dialog'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

import {useHistory} from '@/features/History'
import {useSearch} from './hooks'

export const SearchDialog = (props: DialogProps) => {
  const {search, setSearch, results} = useSearch()
  const history = useHistory()

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
        <CommandSeparator />
        <CommandGroup heading='History'>
          {history.slice(0, 10).map((item) => (
            <CommandItem key={item.id}>{item.id}</CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
