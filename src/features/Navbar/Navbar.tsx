import NextImage from 'next/image'
import NextLink from 'next/link'

import logo from '@/app/onepiece.png'

export const Navbar = () => (
  <nav className='sticky top-0 z-50 bg-white py-2 shadow'>
    <div className='container flex max-w-xl items-center justify-between gap-4'>
      <NextLink href='/'>
        <NextImage src={logo} alt='Index' height='40' />
      </NextLink>
      <NextLink href='/_/tags' className='text-sm'>
        Tags
      </NextLink>
    </div>
  </nav>
)
