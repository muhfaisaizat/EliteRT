import React from 'react'
import Tambah from './dialogExpenditure/Tambah'
import TableExpenditure from './tabelExpenditure/TableExpenditure'


const Expenditure = () => {
  return (
    <div className=' w-full grid gap-8 py-3'>
            <div className='w-full px-4 flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Pengeluaran</h1>
                <Tambah/>
            </div>

            <div className='w-full bg-white py-3  px-8 rounded-2xl'>
                <TableExpenditure />
            </div>
           
        </div>
  )
}

export default Expenditure
