import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { HiHomeModern } from 'react-icons/hi2'
import { Button } from "@/components/ui/button"
import { TbEdit } from "react-icons/tb";
import { Badge } from '@/components/ui/badge'
import EditHome from '../editHome/EditHome';
import ResidentsHistory from '../history/residentsHistory/ResidentsHistory';
import PaymentHistory from '../history/paymentHistory/PaymentHistory';




const ViewDetailHome = () => {
    const navigate = useNavigate();
    const [showEdit, setShowEdit] = useState(false);
    return (
        <div className=' w-full grid gap-8 py-3'>
            <div className='w-full px-4 flex gap-4 items-center' >
                <FaArrowLeftLong size={18} onClick={() => navigate("/perumahan")} className='hover:cursor-pointer' />
                <h1 className='text-2xl font-bold'>Detail Rumah</h1>
            </div>
            <div className='w-full bg-white rounded-xl  '>
                {!showEdit && (
                    <div className='flex flex-col gap-4  px-8 py-3'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-semibold'>Rumah Bapak budi</h1>
                            <Button onClick={() => setShowEdit(!showEdit)} className="w-auto"><TbEdit /></Button>
                        </div>
                        <div className='grid gap-2'>
                            <div className='flex gap-3'>
                                <Badge className="w-auto">No rumah.01</Badge>
                                <Badge className="w-auto">Kontrak</Badge>
                            </div>
                            <p>Lemahduwur, Batokan, Kec. Ngantru, Kabupaten Tulungagung, Jawa Timur</p>
                        </div>
                    </div>
                )}
                {showEdit && <EditHome setShowEdit={setShowEdit} showEdit={showEdit} />}
            </div>
            <div className='flex flex-col gap-4  px-8 py-3'>
                <h1 className='font-semibold'>Penghuni</h1>
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                    {[...Array(9)].map((_, index) => (
                        <div key={index} className="p-4 bg-white rounded-xl grid gap-2">
                            <h1 className="font-medium">Agus budi speed</h1>
                            <p className="text-gray-400 text-xs">98542172613583</p>
                            <div className='flex '>
                                <Badge variant="outline">Belum menikah</Badge>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6  ">
                
                <div className="flex flex-col gap-4 w-full lg:w-1/2 px-8 py-3 bg-white rounded-xl">
                    <h1 className="font-semibold">Riwayat Penghuni Rumah</h1>
                    <ResidentsHistory/>
                </div>

                
                <div className="flex flex-col gap-4 w-full lg:w-1/2 px-8 py-3 bg-white rounded-xl">
                    <h1 className="font-semibold">Riwayat Pembayaran Iuran</h1>
                    <PaymentHistory/>
                </div>
            </div>


        </div>
    )
}

export default ViewDetailHome
