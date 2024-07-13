import {readdirSync} from 'node:fs'
import {basename} from 'node:path'
import {cache} from 'react'

export const getNoteIds = cache(() => {
  return new Set(
    readdirSync(`${process.cwd()}/content`)
      .filter((filepath) => filepath.endsWith('.md'))
      .map((filename) => basename(filename, '.md')),
  )
})
