import {metadata} from '@/app/metadata'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import {ArrowLeft} from 'lucide-react'
import Link from 'next/link'
import {MdxComponent} from './MdxComponent'

namespace Backlinks {
  export type Props = {id: string}
}

export const Backlinks = ({id}: Backlinks.Props) => {
  const {wikilinks} = metadata
  const backlinks = wikilinks
    .filter(({to}) => to === id)
    .map(({from}) => from)
    .filter((fromId) => fromId !== 'index')

  if (!backlinks.length) return null

  return (
    <div className='mt-10 flex flex-col gap-2'>
      <h1 className='font-bold text-xl'>{`${backlinks.length} Backlink${backlinks.length > 1 ? 's' : ''}`}</h1>
      <Accordion type='multiple' className='space-y-2'>
        {backlinks.map((backlinkId) => (
          <Backlink key={backlinkId} id={backlinkId} />
        ))}
      </Accordion>
    </div>
  )
}

const Backlink = async ({id}: Backlinks.Props) => {
  const {code, frontmatter} = metadata.notes[id] ?? {}
  if (!code || !frontmatter) return null

  return (
    <AccordionItem className='border px-2' value={id}>
      <AccordionTrigger className='hover:no-underline'>
        <div className='flex items-center gap-2 pl-2'>
          <Link href={`/${id}`} className='text-black/50 hover:text-black'>
            <ArrowLeft size={16} />
          </Link>
          <div>{frontmatter.title}</div>
        </div>
      </AccordionTrigger>
      <AccordionContent className='max-h-60 overflow-y-auto px-2'>
        <MdxComponent code={code} />
      </AccordionContent>
    </AccordionItem>
  )
}
