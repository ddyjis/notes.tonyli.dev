import NextImage from 'next/image'
import NextLink from 'next/link'

import logo from '@/app/pensieve.png'
import {Search} from '@/features/Search'

export const Navbar = () => (
  <nav className='sticky top-0 z-50 border-b-2 bg-white py-4'>
    <div className='container flex max-w-xl items-center justify-between gap-4'>
      <NextLink href='/'>
        <NextImage src={logo} alt='Index' height='32' />
      </NextLink>
      <Search />
      <NextLink href='/_/tags'>Tags</NextLink>
    </div>
  </nav>
)
