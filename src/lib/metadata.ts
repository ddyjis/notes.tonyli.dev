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
  const entries: [string, {frontmatter: Record<string, string>; content: string}][] = []
  for (const entry of Object.entries(noteMapping)) {
    const id = entry[0]
    let content = entry[1]
    const {frontmatter} = await bundleMDX({source: content, mdxOptions})
    content = content.startsWith('---') ? content.split('---').slice(2).join('---') : content
    content = content.replaceAll('[[', '').replaceAll(']]', '')
    entries.push([id, {frontmatter: {title: frontmatter.title}, content}])
  }
  return Object.fromEntries(entries)
})
