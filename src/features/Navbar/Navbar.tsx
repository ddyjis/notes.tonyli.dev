import {Tags} from 'lucide-react'
import NextImage from 'next/image'
import NextLink from 'next/link'

import logo from '@/app/onepiece.png'
import {Search} from '@/features/Search'

export const Navbar = () => (
  <nav className='sticky top-0 z-50 border-primary border-b-2 bg-white py-2'>
    <div className='container flex max-w-xl items-center justify-between gap-4'>
      <NextLink href='/'>
        <NextImage src={logo} alt='Index' height='40' />
      </NextLink>
      <Search />
      <NextLink href='/_/tags'>
        <Tags size={28} className='text-primary' />
      </NextLink>
    </div>
  </nav>
)
