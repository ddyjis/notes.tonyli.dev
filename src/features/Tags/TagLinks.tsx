import Link from 'next/link'
import {notFound} from 'next/navigation'

import {metadata} from '@/app/metadata'

namespace TagLinks {
  export type Props = {
    tag: string
  }
}

export const TagLinks = ({tag}: TagLinks.Props) => {
  const {hashtags} = metadata
  const taglinks = hashtags[tag]
  if (!taglinks.length) return notFound()
  return (
    <ul className='list-disc pl-4'>
      {taglinks.map((id) => (
        <li key={id}>
          <TagLink id={id} />
        </li>
      ))}
    </ul>
  )
}

namespace TagLink {
  export type Props = {
    id: string
  }
}
const TagLink = async ({id}: TagLink.Props) => {
  const {frontmatter} = metadata.notes[id] ?? {}
  if (!frontmatter) return null
  return <Link href={`/${id}`}>{frontmatter.title?.toString() ?? id}</Link>
}
