import '@/app/global.css'
import type {Metadata} from 'next'
import {Fira_Code} from 'next/font/google'

import {Navbar} from '@/features/Navbar'
import {cn} from '@/lib/utils'

export const metadata = {
  title: '__tony_li__',
  description: 'ひとつなぎの大秘寶',
} satisfies Metadata

const Layout = async ({children}: {children: React.ReactNode}) => {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' type='image/png' />
        <link
          href='https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css'
          rel='stylesheet'
        />
        <link
          href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github.min.css'
          rel='stylesheet'
        />
      </head>
      <body className={cn('h-screen bg-white font-mono antialiased', font.variable)}>
        <Navbar />
        <div className='container max-w-xl flex-1 overflow-auto py-4'>{children}</div>
      </body>
    </html>
  )
}
export default Layout
const font = Fira_Code({subsets: ['latin'], variable: '--font'})
