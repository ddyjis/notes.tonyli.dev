import 'dotenv/config'

import {existsSync, readdirSync} from 'node:fs'
import {readFile, writeFile} from 'node:fs/promises'
import {basename} from 'node:path'
import {bundleMDX} from 'mdx-bundler'
import type {BundleMDXOptions} from 'mdx-bundler/dist/types'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkWikiLink from 'remark-wiki-link'
import {unified} from 'unified'
import {SKIP, visit} from 'unist-util-visit'

import {updateAlgoliaIndex} from '@/lib/algolia'

const HASHTAG_REGEX = /(?<![\w/])#(\w+)(?![\w/#])/g

type Frontmatter = {
  title?: string
  aliases?: string[]
  date?: string
  'date modified'?: string
}
type NoteMetadata = {
  id: string
  frontmatter: Frontmatter
  code: string
  document: string
}
export type Metadata = {
  notes: Partial<Record<string, NoteMetadata>>
  hashtags: Partial<Record<string, string[]>>
  wikilinks: {from: string; to: string}[]
}
const preprocessMdx = async () => {
  const directory = `${process.cwd()}/content`
  if (!existsSync(directory)) throw new Error('Content directory not found')
  const filenames = readdirSync(directory).filter((filename) => filename.endsWith('.md'))
  const entries: [string, NoteMetadata][] = []
  const hashtagToIds: Record<string, Set<string>> = {}
  const idToWikilinks: Record<string, Set<string>> = {}
  const mdxOptions = getMdxOptions(filenames.map((filename) => basename(filename, '.md')))
  for (const filename of filenames) {
    const id = basename(filename, '.md')
    const rawContent = await readFile(`${directory}/${filename}`, 'utf8')
    const {code, frontmatter} = await bundleMDX({
      source: rawContent,
      mdxOptions,
      esbuildOptions(options) {
        options.define = {
          'process.env.NODE_ENV': '"development"',
        }
        return options
      },
    })
    const document = cleanMarkdown(rawContent)
    const ast = parser.parse(document)
    parser.runSync(ast)
    visit(ast, 'hashtag', (node) => {
      const hashtag = node.data.hProperties.value.toLowerCase()
      if (!hashtagToIds[hashtag]) {
        hashtagToIds[hashtag] = new Set()
      }
      hashtagToIds[hashtag].add(id)
    })
    visit(ast, 'wikiLink', (node) => {
      const wikilink = node.data.permalink
      if (!idToWikilinks[id]) {
        idToWikilinks[id] = new Set()
      }
      idToWikilinks[id].add(wikilink)
    })

    entries.push([id, {id, frontmatter, code, document}])
  }
  const notes = Object.fromEntries(entries)
  updateAlgoliaIndex(notes)
  const output: Metadata = {
    notes,
    hashtags: Object.fromEntries(
      Object.entries(hashtagToIds).map(([hashtag, ids]) => [hashtag, Array.from(ids)]),
    ),
    wikilinks: Object.entries(idToWikilinks).flatMap(([id, wikilinks]) =>
      Array.from(wikilinks).map((to) => ({from: id, to})),
    ),
  }
  const outputPath = `${process.cwd()}/src/app/metadata.ts`
  await writeFile(
    outputPath,
    `import type {Metadata} from '@/lib/preflight'\nexport const metadata: Metadata = ${JSON.stringify(output)}`,
  )
}

const getMdxOptions: (_: string[]) => Parameters<typeof bundleMDX>[0]['mdxOptions'] =
  (noteIds: string[]) => (options) => {
    options.remarkPlugins = [
      ...(options.remarkPlugins ?? []),
      remarkMath,
      remarkGfm,
      getWikiLinkPlugin(noteIds.map((id) => id.replace('index', ''))),
      remarkHashtags,
    ]
    options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeKatex]
    return options
  }

type Plugin = ReturnType<
  BundleMDXOptions<Record<string, string>>['mdxOptions']
>['remarkPlugins'][number]
const getWikiLinkPlugin = (noteIds: string[]) =>
  [
    remarkWikiLink,
    {
      aliasDivider: '|',
      hrefTemplate: (link: string) => `/${link}`,
      permalinks: noteIds,
      wikiLinkClassName: 'text-primary font-semibold underline',
      newClassName: 'text-primary/50 font-semibold',
    },
  ] satisfies Plugin

const remarkHashtags: Plugin = () => {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      const {value} = node
      const matches = value.match(HASHTAG_REGEX)
      if (matches) {
        const parts = []
        let lastIndex = 0
        for (const match of value.matchAll(HASHTAG_REGEX)) {
          const [fullMatch, hashtag] = match
          const matchIndex = match.index

          // Add text before the hashtag
          if (matchIndex > lastIndex) {
            parts.push({
              type: 'text',
              value: value.slice(lastIndex, matchIndex),
            })
          }

          // Add the hashtag node
          parts.push({
            type: 'hashtag',
            value: fullMatch,
            data: {
              hName: 'hashtag',
              hProperties: {value: hashtag},
            },
          })

          lastIndex = matchIndex + fullMatch.length
        }

        // Add any remaining text after the last hashtag
        if (lastIndex < value.length) {
          parts.push({
            type: 'text',
            value: value.slice(lastIndex),
          })
        }

        parent.children.splice(index, 1, ...parts)
        return [SKIP, index + parts.length - 1]
      }
    })
  }
}

/**
 * Remove frontmatter and wikilinks
 */
const cleanMarkdown = (content: string) => {
  let cleanedContent = content
  cleanedContent = cleanedContent.startsWith('---')
    ? cleanedContent.split('---').slice(2).join('---')
    : cleanedContent
  cleanedContent = cleanedContent.replaceAll('[[', '').replaceAll(']]', '')
  return cleanedContent
}

const parser = unified()
  .use(remarkParse)
  .use(...getWikiLinkPlugin([]))
  .use(remarkHashtags)

preprocessMdx()