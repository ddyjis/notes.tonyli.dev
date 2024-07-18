import {getNoteMapping} from '@/lib/metadata'
import {preprocessMarkdown} from '@/lib/remark'
import Link from 'next/link'

export const TagsList = () => {
  const {hashtags} = preprocessMarkdown(getNoteMapping())
  const tags = Object.keys(hashtags)

  if (!tags.length) return <div>No tags</div>

  return (
    <div className='flex flex-col gap-2'>
      {tags.map((name) => (
        <Link key={name} href={`/_/tags/${name}`}>{`#${name}`}</Link>
      ))}
    </div>
  )
}
