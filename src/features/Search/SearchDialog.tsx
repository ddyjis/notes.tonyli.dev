'use client'

import type {DialogProps} from '@radix-ui/react-dialog'
import {useRouter} from 'next/navigation'
import {type ComponentProps, Fragment, useMemo} from 'react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {useFrontmatterCache} from '@/features/FrontmatterCache'
import {useHistory} from '@/features/History'
import {cn} from '@/lib/utils'

import {useSearch} from './hooks'

const MATCH_SECTION_MARGIN_BY_WORD = 10

export const SearchDialog = (props: DialogProps) => {
  const {search, setSearch, results} = useSearch()
  const history = useHistory()
  const router = useRouter()
  const handleSelect = (id: string) => {
    props.onOpenChange(false)
    router.push(`/${id}`)
  }

  return (
    <CommandDialog {...props} shouldFilter={false}>
      <CommandInput value={search} onValueChange={setSearch} />
      <CommandList className='max-h-[600px]'>
        {!results && <CommandEmpty>Search for a note...</CommandEmpty>}
        {results?.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
        {results?.length > 0 && (
          <CommandGroup heading='Results'>
            {results.map((result) => (
              <Fragment key={result.id}>
                {result.positions.map((position) => (
                  <SearchItem
                    key={position[0]}
                    id={result.id}
                    position={position}
                    onSelect={() => handleSelect(result.id)}
                  />
                ))}
              </Fragment>
            ))}
          </CommandGroup>
        )}
        <CommandSeparator />
        <CommandGroup heading='History'>
          {history.slice(0, 10).map((item) => (
            <HistoryItem key={item.id} id={item.id} onSelect={() => handleSelect(item.id)} />
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

type HistoryItemProps = ComponentProps<typeof CommandItem> & {id: string}
const HistoryItem = ({id, ...props}: HistoryItemProps) => {
  const frontmatterCache = useFrontmatterCache()
  const {frontmatter} = frontmatterCache[id] || {}
  if (!frontmatter) return null
  return <CommandItem {...props}>{frontmatter.title}</CommandItem>
}

type SearchItemProps = ComponentProps<typeof CommandItem> & {position: [number, number]; id: string}
const SearchItem = ({id, position, className, ...props}: SearchItemProps) => {
  const frontmatterCache = useFrontmatterCache()
  const {content, frontmatter} = frontmatterCache[id] || {}
  const words = useMemo(() => (content ?? '').split(/\s+/), [content])
  const wordStartIndices = useMemo(
    () =>
      words.reduce<number[]>((acc, word, index) => {
        // NOTE: This is AI generated, it looks like it is assmuming that the words are separated by 1 space
        acc.push(index === 0 ? 0 : acc[index - 1] + words[index - 1].length + 1)
        return acc
      }, []),
    [words],
  )
  if (!content || !frontmatter) return null
  return (
    <CommandItem {...props} className={cn(className, 'flex flex-col gap-1')}>
      <h1 className='font-bold text-lg'>{frontmatter.title}</h1>
      <HighlightedContent
        content={content}
        words={words}
        wordStartIndices={wordStartIndices}
        position={position}
        key={position[0]}
      />
    </CommandItem>
  )
}

type HighlightedContentProps = {
  content: string
  words: string[]
  wordStartIndices: number[]
  position: [number, number]
}
const HighlightedContent = ({
  content,
  words,
  wordStartIndices,
  position,
}: HighlightedContentProps) => {
  const startIndex = position[0]
  const endIndex = position[0] + position[1]

  const startWordIndex = wordStartIndices.findIndex((index) => index >= startIndex) - 1
  const endWordIndex = wordStartIndices.findIndex((index) => index >= endIndex) - 1

  const beforeStartIndex = Math.max(0, startWordIndex - MATCH_SECTION_MARGIN_BY_WORD)
  const afterEndIndex = Math.min(words.length, endWordIndex + MATCH_SECTION_MARGIN_BY_WORD + 1)

  const beforeWords = words.slice(beforeStartIndex, startWordIndex)
  const afterWords = words.slice(endWordIndex + 1, afterEndIndex)

  const matchText = content.slice(startIndex, endIndex)

  const beforeEllipses = beforeStartIndex > 0 ? '...' : ''
  const afterEllipses = afterEndIndex < words.length ? '...' : ''

  return (
    <p className='mt-1 text-sm'>
      <span>{[beforeEllipses, ...beforeWords].join(' ')} </span>
      <span className='bg-primary text-primary-foreground'>{matchText}</span>
      <span> {[...afterWords, afterEllipses].join(' ')}</span>
    </p>
  )
}
