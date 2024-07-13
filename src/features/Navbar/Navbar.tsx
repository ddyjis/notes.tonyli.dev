import NextImage from 'next/image'
import NextLink from 'next/link'

import logo from '@/app/pensieve.png'

export const Navbar = () => (
  <nav className='border-b-2 py-4'>
    <div className='container'>
      <NextLink href='/'>
        <NextImage src={logo} alt='Index' height='32' />
      </NextLink>
    </div>
  </nav>
)
