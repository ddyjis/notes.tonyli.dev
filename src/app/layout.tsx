import '@/app/global.css'
import type {Metadata} from 'next'
import {Fira_Code} from 'next/font/google'

import {cn} from '@/lib/utils'
import {Navbar} from '@/features/Navbar'

export const metadata = {
  title: '__tony_li__',
} satisfies Metadata

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' type='image/png' />
        <link
          href='https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css'
          rel='stylesheet'
        />
      </head>
      <body className={cn('flex h-screen flex-col bg-white font-mono antialiased', font.variable)}>
        <Navbar />
        <div className='container flex-1 overflow-auto py-4'>{children}</div>
      </body>
    </html>
  )
}
export default Layout
const font = Fira_Code({subsets: ['latin'], variable: '--font'})
