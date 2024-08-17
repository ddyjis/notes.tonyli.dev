import {Note} from '@/features/Note'

const NotePage = ({params}: {params: {slug: string[]}}) => {
  if (params.slug.length === 0) return <Note id='index' />
  if (params.slug.length > 2) return null
  const [id] = params.slug
  return <Note id={id} />
}

export default NotePage
