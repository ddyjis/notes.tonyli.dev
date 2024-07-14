import {existsSync} from 'node:fs'
import {readFile} from 'node:fs/promises'
import {bundleMDX} from 'mdx-bundler'
import {notFound} from 'next/navigation'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import {getWikiLinkPlugin, remarkHashtags} from '@/lib/remark'
import {getNoteMapping} from './data'

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
        remarkMath,
        remarkGfm,
        getWikiLinkPlugin(Object.keys(getNoteMapping()).map((id) => id.replace('index', ''))),
        remarkHashtags,
      ]
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeKatex]
      return options
    },
  })
}
