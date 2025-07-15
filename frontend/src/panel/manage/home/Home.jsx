import React from 'react'
import TabelHome from './cardHome/CardHome'


const Home = () => {
    return (
        <div className=' w-full grid gap-8 py-3'>
            <div className='w-full px-4 flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Perumahan</h1>

            </div>
            <div className='w-full  py-3  px-8 rounded-2xl'>
                <TabelHome />
            </div>
        </div>
    )
}

export default Home
