import {Note} from '@/features/Note'

const NotePage = ({params}: {params: {id: string}}) => {
  return <Note id={params.id} />
}

export default NotePage
