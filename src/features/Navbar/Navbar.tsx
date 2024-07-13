import NextImage from 'next/image'
import NextLink from 'next/link'

import logo from '@/app/pensieve.png'

export const Navbar = () => (
  <nav className='sticky top-0 z-50 border-b-2 bg-white py-4'>
    <div className='container max-w-xl'>
      <NextLink href='/'>
        <NextImage src={logo} alt='Index' height='32' />
      </NextLink>
    </div>
  </nav>
)
