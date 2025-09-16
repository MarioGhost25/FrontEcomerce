import { NavLink } from 'react-router'
import { useState } from 'react'
import { Button } from './Button'

export const Nav = () => {
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        // You can handle search logic here (e.g., navigate or filter products)
        alert(`Searching for: ${search}`)
    }

    return (
        <nav className='w-full h-15 bg-amber-100 flex justify-evenly items-center px-4'>
            <NavLink to='/'>
                <div className='font-black text-3xl text-cyan-800'>Ecommerce</div>
            </NavLink>
            <div className='flex justify-center gap-4 text-cyan-800 text-xl font-semibold'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/Product'>Products</NavLink>

            </div>
            <form onSubmit={handleSearch} className='flex items-center gap-2'>
                <input
                    type='text'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder='Search products...'
                    className='px-3 py-1 bg-amber-50 rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-cyan-700'
                />
                <Button
                    type='submit'
                    className='bg-cyan-800 text-white px-4 py-1 rounded-lg hover:bg-cyan-600 transition'
                    text='Search'

                />
            </form>
        </nav>
    )
}
