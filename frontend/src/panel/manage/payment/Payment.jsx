import React from 'react'
import TablePayment from './tabelPayment/TablePayment'
import Tambah from './dialogPayment/Tambah'



const Payment = () => {
  return (
    <div className=' w-full grid gap-8 py-3'>
            <div className='w-full px-4 flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Pembayaran Iuran</h1>
                <Tambah/>
            </div>

            <div className='w-full bg-white py-3  px-8 rounded-2xl'>
               <TablePayment/>
            </div>
           
        </div>
  )
}

export default Payment
