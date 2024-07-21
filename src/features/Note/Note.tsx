import {metadata} from '@/app/metadata'

import {Backlinks} from './Backlinks'
import {Frontmatter} from './Frontmatter'
import {HistoryHandler} from './HistoryHandler'
import {MdxComponent} from './MdxComponent'

namespace Note {
  export type Props = {
    id: string
  }
}

export const Note = async ({id}: Note.Props) => {
  const {code, frontmatter} = metadata.notes[id] ?? {}
  if (!code || !frontmatter) return null

  return (
    <div>
      <HistoryHandler id={id} />
      <Frontmatter
        title={frontmatter.title?.toString() ?? id}
        createDate={frontmatter.date}
        updateDate={frontmatter['date modified']}
      />
      <MdxComponent code={code} />
      <Backlinks id={id} />
    </div>
  )
}
