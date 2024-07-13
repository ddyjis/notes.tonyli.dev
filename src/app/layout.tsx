import '@/app/global.css'
import type { Metadata } from 'next'
import { Fira_Code } from 'next/font/google'

import { cn } from '@/lib/utils'

export const metadata = {
  title: '__tony_li__',
} satisfies Metadata

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' type='image/png' />
      </head>
      <body className={cn('h-screen font-mono antialiased', font.variable)}>{children}</body>
    </html>
  )
}
export default Layout
const font = Fira_Code({ subsets: ['latin'], variable: '--font' })
