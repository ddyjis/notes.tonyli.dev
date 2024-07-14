import type {BundleMDXOptions} from 'mdx-bundler/dist/types'
import remarkWikiLinks from 'remark-wiki-link'
import {visit} from 'unist-util-visit'

type Plugin = ReturnType<
  BundleMDXOptions<Record<string, string>>['mdxOptions']
>['remarkPlugins'][number]
export const getWikiLinkPlugin = (noteIds: string[]) =>
  [
    remarkWikiLinks,
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
        const parts = value.split(HASHTAG_REGEX)
        const children = []
        for (let i = 0; i < parts.length; i++) {
          if (i % 2 === 0) {
            if (parts[i]) {
              children.push({type: 'text', value: parts[i]})
            }
          } else {
            children.push({
              type: 'hashtag',
              value: `#${parts[i]}`,
              data: {
                hName: 'hashtag',
                hProperties: {value: parts[i]},
              },
            })
          }
        }
        parent.children.splice(index, 1, ...children)
      }
    })
  }
}
const HASHTAG_REGEX = /#(\w+)/g
