import {Note} from '@/features/Note'

const NotePage = async ({params}: {params: {id: string}}) => {
  return <Note id={params.id} />
}

export default NotePage
