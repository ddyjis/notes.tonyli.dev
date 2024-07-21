import {metadata} from '@/app/metadata'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

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
    <AccordionItem className='rounded-lg border border-primary/20 px-2' value={id}>
      <AccordionTrigger className='text-xl'>{frontmatter.title}</AccordionTrigger>
      <AccordionContent className='max-h-60 overflow-y-auto'>
        <MdxComponent code={code} />
      </AccordionContent>
    </AccordionItem>
  )
}
