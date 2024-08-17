import Link from 'next/link'
import slugify from 'slugify'

namespace Frontmatter {
  export type Props = {
    id: string
    title?: string
    createDate?: string
    updateDate?: string
  }
}

export const Frontmatter = ({id, title, createDate, updateDate}: Frontmatter.Props) => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <Link href={`/${id}/${slugify(title ?? '', {lower: true})}`}>
        <h1 className='font-bold text-2xl'>{title ?? id}</h1>
      </Link>
      <div className='flex w-full justify-between'>
        {createDate && <div className='text-slate-400'>C: {createDate.slice(0, 10)}</div>}
        {updateDate && <div className='text-slate-400'>M: {updateDate.slice(0, 10)}</div>}
      </div>
    </div>
  )
}
