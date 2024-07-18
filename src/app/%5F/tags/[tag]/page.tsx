import {TagLinks} from '@/features/Tags'

const TagPage = ({params}: {params: {tag: string}}) => {
  return (
    <>
      <h1 className='font-bold text-3xl'>{`#${params.tag}`}</h1>
      <TagLinks tag={params.tag} />
    </>
  )
}

export default TagPage
