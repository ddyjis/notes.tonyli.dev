import {readFileSync, readdirSync} from 'node:fs'
import {basename} from 'node:path'
import {bundleMDX} from 'mdx-bundler'
import {cache} from 'react'

import {mdxOptions} from '@/lib/mdx-bundle'

export const getNoteMapping = cache(() => {
  const directory = `${process.cwd()}/content`
  const filenames = readdirSync(directory).filter((filename) => filename.endsWith('.md'))
  return Object.fromEntries(
    filenames.map((filename) => [
      basename(filename, '.md'),
      readFileSync(`${directory}/${filename}`, 'utf8'),
    ]),
  )
})

export const getNotesFrontmatterMapping = cache(async () => {
  const noteMapping = getNoteMapping()
  const entries: [string, Record<string, string>][] = []
  for (const [id, content] of Object.entries(noteMapping)) {
    const {frontmatter} = await bundleMDX({source: content, mdxOptions})
    entries.push([id, frontmatter])
  }
  return Object.fromEntries(entries)
})
