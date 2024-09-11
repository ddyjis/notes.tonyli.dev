import '@/app/global.css'
import type {Metadata} from 'next'
import localFont from 'next/font/local'

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
        <footer className='py-4 text-center text-gray-500 text-sm'>
          Font provided by{' '}
          <a
            href='https://ia.net/writer'
            className='underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            iA Writer
          </a>
        </footer>
      </body>
    </html>
  )
}
export default Layout
const font = localFont({
  src: [
    {
      path: './fonts/iAWriterMonoS-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/iAWriterMonoS-Bold.woff2',
      weight: '700',
      style: 'bold',
    },
    {
      path: './fonts/iAWriterMonoS-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: './fonts/iAWriterMonoS-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font',
})
