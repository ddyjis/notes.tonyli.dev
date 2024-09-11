'use client'

import {type MDXContentProps, getMDXComponent} from 'mdx-bundler/client'
import NextLink from 'next/link'
import {useMemo} from 'react'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {cn} from '@/lib/utils'

const COMPONENTS = {
  h1: ({className, ...props}) => (
    <h1 {...props} className={cn(className, 'mt-7 mb-2 font-bold text-xl')} />
  ),
  h2: ({className, ...props}) => (
    <h2 {...props} className={cn(className, 'mt-6 mb-2 font-bold uppercase [h1+&]:mt-2')} />
  ),
  h3: ({className, ...props}) => (
    <h3 {...props} className={cn(className, 'mt-5 mb-2 font-bold italic [h2+&]:mt-2')} />
  ),
  p: ({className, ...props}) => (
    <p {...props} className={cn(className, 'mt-4 mb-2 text-base leading-[1.6rem] [h1+&]:mt-2 [h2+&]:mt-2 [h3+&]:mt-2')} />
  ),
  a: ({className, ...props}) => (
    <a {...props} className={cn(className, 'text-primary underline')} />
  ),
  blockquote: ({className, ...props}) => (
    <blockquote
      {...props}
      className={cn(
        className,
        '-ml-2 &_p:mt-0 mt-2 mb-2 border-l-2 bg-primary/10 px-2 py-1 text-base first:*:mt-2',
      )}
    />
  ),
  ul: ({className, ...props}) => (
    <ul {...props} className={cn(className, 'mt-2 mb-2 list-disc pl-8 text-base')} />
  ),
  ol: ({className, ...props}) => (
    <ol {...props} className={cn(className, 'mt-2 mb-2 list-decimal pl-8 text-base')} />
  ),
  li: ({className, ...props}) => (
    <li {...props} className={cn(className, 'text-base leading-[1.6rem]')} />
  ),
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: ({className, ...props}) => (
    <TableHead {...props} className={cn(className, 'whitespace-nowrap')} />
  ),
  td: TableCell,
  hashtag: ({value}) => (
    <NextLink href={`/_/tags/${value}`} className='font-semibold text-primary'>
      #{value}
    </NextLink>
  ),
  pre: ({className, ...props}) => (
    <pre {...props} className={cn(className, 'overflow-auto border')} />
  ),
  code: ({className, ...props}) => (
    <code {...props} className={cn(className, 'bg-primary/10 px-1 py-0.5')} />
  ),
} satisfies MDXContentProps['components']

namespace MdxComponent {
  export type Props = {
    code: string
  }
}

export const MdxComponent = ({code}: MdxComponent.Props) => {
  const Component = useMemo(() => getMDXComponent(code), [code])

  // Wrap the MDX content in a div to so that the first h1 is hidden
  return (
    <div className='first:*:hidden'>
      <Component components={COMPONENTS} />
    </div>
  )
}
