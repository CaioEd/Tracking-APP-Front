import { Link } from 'react-router-dom'

import { MapPin, UserRound } from 'lucide-react'


const Header = () => {
  return (
    <>
        <header className='flex justify-between w-full h-15 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700'>
            <Link to="/">
                <h1 className='flex text-2xl font-semibold p-5 brightness-125 text-white'>Tracking App <MapPin className='ml-3 mt-1' /> </h1>        
            </Link>

            <Link to="/" className='mt-2 mr-5 flex flex-col items-center cursor-pointer'>
                <UserRound className='text-white text-2xl ' />
                <span className='text-white text-lg font-semibold'>Admin</span>
            </Link>
        </header>
    </>
    
  )
}

export default Header