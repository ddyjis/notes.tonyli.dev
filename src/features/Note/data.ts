import {readFileSync, readdirSync} from 'node:fs'
import {basename} from 'node:path'
import {cache} from 'react'

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
