import {getMdxBundle} from '@/lib/mdx-bundle'

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
  const {code, frontmatter} = await getMdxBundle(id)

  return (
    <div>
      <HistoryHandler id={id} />
      <Frontmatter
        title={frontmatter.title}
        createDate={frontmatter.date}
        updateDate={frontmatter['date modified']}
      />
      <MdxComponent code={code} />
      <Backlinks id={id} />
    </div>
  )
}
