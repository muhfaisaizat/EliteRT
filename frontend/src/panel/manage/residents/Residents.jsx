import React from 'react'
import TableResident from './tabelResident/TableResident'
import Tambah from './dialogResident/Tambah'





const Residents = () => {
    return (
        <div className=' w-full grid gap-8 py-3'>
            <div className='w-full px-4 flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Data Penghuni</h1>
                <Tambah/>
            </div>

            <div className='w-full bg-white py-3  px-8 rounded-2xl'>
                <TableResident />
            </div>
           
        </div>
    )
}

export default Residents
