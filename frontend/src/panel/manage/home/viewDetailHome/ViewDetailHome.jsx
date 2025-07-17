import React, { useState, useEffect } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { HiHomeModern } from 'react-icons/hi2'
import { Button } from "@/components/ui/button"
import { TbEdit } from "react-icons/tb";
import { Badge } from '@/components/ui/badge'
import EditHome from '../editHome/EditHome';
import ResidentsHistory from '../history/residentsHistory/ResidentsHistory';
import PaymentHistory from '../history/paymentHistory/PaymentHistory';
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";
import { useToast } from '@/hooks/use-toast';
import { RiCloseFill } from "react-icons/ri";



const ViewDetailHome = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [showEdit, setShowEdit] = useState(false);
    const [data, setData] = useState([]);
    const [dataRiwayatPenghuni, setdataRiwayatPenghuni] = useState([]);
    const idRumah = localStorage.getItem("id_rumah");
    const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_URL}/api/rumah/${idRumah}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(response.data.data);
            setData(response.data.data);
            setdataRiwayatPenghuni(response.data.data.riwayat_penghuni);


        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Gagal memuat data rumah',
                description: error.response?.data?.message || error.message,
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [idRumah]);


     const handleDelete = async (id) => {
        const token = localStorage.getItem("token");

        try {
            await axios.delete(`${API_URL}/api/detail-penghuni/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast({
                title: "Berhasil!",
                description: "Data penghuni berhasil dihapus.",
            });
             fetchData();
        } catch (error) {
            console.error("Gagal menghapus data:", error);

            // Notifikasi gagal
            toast({
                variant: "destructive",
                title: "Gagal menghapus!",
                description: "Terjadi kesalahan saat menghapus data.",
            });
        }
    };
    return (
        <div className=' w-full grid gap-8 py-3'>
            <div className='w-full px-4 flex gap-4 items-center' >
                <FaArrowLeftLong size={18} onClick={() => { localStorage.removeItem("id_rumah"); navigate("/panel/perumahan"); }} className='hover:cursor-pointer' />
                <h1 className='text-2xl font-bold'>Detail Rumah</h1>
            </div>
            <div className='w-full bg-white rounded-xl  '>
                {!showEdit && (
                    <div className='flex flex-col gap-4  px-8 py-3'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-semibold'>Rumah {data.nama_rumah ?? '-'}</h1>
                            <Button onClick={() => setShowEdit(!showEdit)} className="w-auto"><TbEdit /></Button>
                        </div>
                        <div className='grid gap-2'>
                            <div className='flex gap-3'>
                                <Badge className="w-auto">No rumah.{data.no_rumah ?? '-'}</Badge>
                                <Badge className="w-auto">{data.status_rumah ?? '-'}</Badge>
                            </div>
                            <p>{data.alamat_rumah ?? '-'}</p>
                        </div>
                    </div>
                )}
                {showEdit && <EditHome setShowEdit={setShowEdit} showEdit={showEdit} idRumah={idRumah} data={data} fetchData={fetchData}/>}
            </div>
            <div className='flex flex-col gap-4  px-8 py-3'>
                <h1 className='font-semibold'>Penghuni</h1>
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                    {data.penghuni_aktif?.length > 0 ? (
                        data.penghuni_aktif.map((penghuni, index) => (
                            <div key={index} className="p-4 bg-white rounded-xl grid gap-2">
                                <div className='flex justify-between'>
                                    <h1 className="font-medium">{penghuni.nama_lengkap}</h1>
                                     <RiCloseFill size={14} className="hover:text-red-500"  onClick={() => handleDelete(penghuni.id_detail_penghuni_rumah)}/>
                                </div>
                                
                                <p className="text-gray-400 text-xs">{penghuni.nomor_telepon}</p>
                                <div className="flex">
                                    <Badge variant="outline">{penghuni.status_perkawinan}</Badge>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No results.</p>
                    )}

                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6  ">

                <div className="flex flex-col gap-4 w-full lg:w-1/2 px-8 py-3 bg-white rounded-xl">
                    <h1 className="font-semibold">Riwayat Penghuni Rumah</h1>
                    <ResidentsHistory dataRiwayatPenghuni={dataRiwayatPenghuni}/>
                </div>


                <div className="flex flex-col gap-4 w-full lg:w-1/2 px-8 py-3 bg-white rounded-xl">
                    <h1 className="font-semibold">Riwayat Pembayaran Iuran</h1>
                    <PaymentHistory />
                </div>
            </div>


        </div>
    )
}

export default ViewDetailHome
