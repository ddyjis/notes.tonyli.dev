import {Frontmatter} from './Frontmatter'
import {MdxComponent} from './MdxComponent'
import {getMdxBundle} from './query'

namespace Note {
  export type Props = {
    id: string
  }
}

export const Note = async ({id}: Note.Props) => {
  const {code, frontmatter} = await getMdxBundle(id)

  return (
    <div>
      <Frontmatter
        title={frontmatter.title}
        createDate={frontmatter.date}
        updateDate={frontmatter['date modified']}
      />
      <MdxComponent code={code} />
    </div>
  )
}
