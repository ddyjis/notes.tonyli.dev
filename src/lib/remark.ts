import type {BundleMDXOptions} from 'mdx-bundler/dist/types'
import {cache} from 'react'
import remarkParse from 'remark-parse'
import remarkWikiLink from 'remark-wiki-link'
import {unified} from 'unified'
import {SKIP, visit} from 'unist-util-visit'

const HASHTAG_REGEX = /(?<![\w/])#(\w+)(?![\w/#])/g

type Plugin = ReturnType<
  BundleMDXOptions<Record<string, string>>['mdxOptions']
>['remarkPlugins'][number]
export const getWikiLinkPlugin = (noteIds: string[]) =>
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

export const remarkHashtags: Plugin = () => {
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

export const preprocessMarkdown = cache((fileContentMap: Record<string, string>) => {
  const hashtagToFiles: Record<string, Set<string>> = {}
  const fileToWikilinks: Record<string, Set<string>> = {}

  const parser = unified()
    .use(remarkParse)
    .use(...getWikiLinkPlugin([]))
    .use(remarkHashtags)

  for (const [filename, content] of Object.entries(fileContentMap)) {
    const ast = parser.parse(content)
    parser.runSync(ast)

    visit(ast, 'hashtag', (node) => {
      const hashtag = node.data.hProperties.value.toLowerCase()
      if (!hashtagToFiles[hashtag]) {
        hashtagToFiles[hashtag] = new Set()
      }
      hashtagToFiles[hashtag].add(filename)
    })

    visit(ast, 'wikiLink', (node) => {
      const wikilink = node.data.permalink
      if (!fileToWikilinks[filename]) {
        fileToWikilinks[filename] = new Set()
      }
      fileToWikilinks[filename].add(wikilink)
    })
  }

  return {
    hashtags: Object.fromEntries(
      Object.entries(hashtagToFiles).map(([hashtag, files]) => [hashtag, Array.from(files)]),
    ),
    wikilinks: Object.entries(fileToWikilinks).flatMap(([filename, wikilinks]) =>
      Array.from(wikilinks).map((to) => ({from: filename, to})),
    ),
  }
})
