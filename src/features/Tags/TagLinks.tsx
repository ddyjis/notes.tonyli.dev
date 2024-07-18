import Link from 'next/link'
import {notFound} from 'next/navigation'

import {getMdxBundle} from '@/lib/mdx-bundle'
import {getNoteMapping} from '@/lib/metadata'
import {preprocessMarkdown} from '@/lib/remark'

namespace TagLinks {
  export type Props = {
    tag: string
  }
}

export const TagLinks = ({tag}: TagLinks.Props) => {
  const {hashtags} = preprocessMarkdown(getNoteMapping())
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
  const {frontmatter} = await getMdxBundle(id)
  return <Link href={`/${id}`}>{frontmatter.title}</Link>
}
