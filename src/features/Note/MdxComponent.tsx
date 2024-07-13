'use client'

import {cn} from '@/lib/utils'
import {getMDXComponent, type MDXContentProps} from 'mdx-bundler/client'
import {useMemo} from 'react'

const COMPONENTS = {
  h1: ({className, ...props}) => (
    <h1 {...props} className={cn(className, 'mt-3 mb-2 font-bold text-3xl first:hidden')} />
  ),
  h2: ({className, ...props}) => (
    <h2 {...props} className={cn(className, 'mt-2 mb-2 font-bold text-2xl')} />
  ),
  h3: ({className, ...props}) => (
    <h3 {...props} className={cn(className, 'mt-2 mb-2 font-bold text-xl')} />
  ),
  p: ({className, ...props}) => (
    <p {...props} className={cn(className, 'mt-2 mb-2 text-base leading-snug')} />
  ),
  blockquote: ({className, ...props}) => (
    <blockquote {...props} className={cn(className, 'mt-2 mb-2 border-l-2 py-1 pl-2 text-base')} />
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
    <div>
      <Component components={COMPONENTS} />
    </div>
  )
}
