import {bundleMDX} from 'mdx-bundler'
import type {BundleMDXOptions} from 'mdx-bundler/dist/types'
import {notFound} from 'next/navigation'
import {existsSync} from 'node:fs'
import {readFile} from 'node:fs/promises'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkWikiLinks from 'remark-wiki-link'

import {getNoteIds} from './data'

export const getMdxBundle = async (id: string) => {
  const filepath = `${process.cwd()}/content/${id}.md`
  if (!existsSync(filepath)) {
    notFound()
  }
  const content = await readFile(filepath, 'utf8')
  return bundleMDX({
    source: content,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        wikiLinkPlugin,
        remarkMath,
        remarkGfm,
      ]
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeKatex]
      return options
    },
  })
}

const wikiLinkPlugin = [
  remarkWikiLinks,
  {
    aliasDivider: '|',
    hrefTemplate: (link: string) => `/${link}`,
    permalinks: Array.from(getNoteIds()).map((id) => id.replace('index', '')),
    wikiLinkClassName: 'text-primary font-semibold underline',
    newClassName: 'text-primary/50 font-semibold',
  },
] satisfies ReturnType<
  BundleMDXOptions<Record<string, string>>['mdxOptions']
>['remarkPlugins'][number]
