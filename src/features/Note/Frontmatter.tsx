namespace Frontmatter {
  export type Props = {
    title?: string
    createDate?: Date
    updateDate?: Date
  }
}

export const Frontmatter = ({title, createDate, updateDate}: Frontmatter.Props) => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <h1 className='font-bold text-2xl'>{title}</h1>
      <div className='flex w-full justify-between'>
        {createDate && <div className='text-slate-400'>C: {formatDate(createDate)}</div>}
        {updateDate && <div className='text-slate-400'>M: {formatDate(updateDate)}</div>}
      </div>
    </div>
  )
}

const formatDate = (date: Date) => date.toISOString().slice(0, 10)
