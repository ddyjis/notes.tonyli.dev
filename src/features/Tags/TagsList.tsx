import Link from 'next/link'

import {metadata} from '@/app/metadata'

export const TagsList = () => {
  const {hashtags} = metadata
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
