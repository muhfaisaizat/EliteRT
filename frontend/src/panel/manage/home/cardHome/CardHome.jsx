import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { HiHomeModern } from 'react-icons/hi2'
import { Input } from '@/components/ui/input'
import TambahHome from '../dialogHome/TambahHome'
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'
import { RiCloseFill } from "react-icons/ri";


const initialData = [
    {
        id: '1',
        namaRumah: 'Rumah Bu Rina',
        alamat: 'Lemahduwur, Batokan, Kec. Ngantru, Kabupaten Tulungagung, Jawa Timur',
        statusPenghuni: 'kontrak',
        jumlahPenghuni: 4,
        nomorRumah: '01',
    },
    {
        id: '2',
        namaRumah: 'Rumah Pak Budi',
        alamat: 'Jl. Kenanga No. 5, Bandung',
        statusPenghuni: 'tetap',
        jumlahPenghuni: 6,
        nomorRumah: '02',
    },
    {
        id: '3',
        namaRumah: 'Rumah Ibu Siti',
        alamat: 'Perumahan Mawar, Blok B No. 8',
        statusPenghuni: 'kontrak',
        jumlahPenghuni: 3,
        nomorRumah: '03',
    },
    {
        id: '4',
        namaRumah: 'Rumah Pak Agus',
        alamat: 'Jl. Melati, Surabaya',
        statusPenghuni: 'tetap',
        jumlahPenghuni: 5,
        nomorRumah: '04',
    },
    {
        id: '5',
        namaRumah: 'Rumah Bu Dewi',
        alamat: 'Jl. Dahlia, Tulungagung',
        statusPenghuni: 'kontrak',
        jumlahPenghuni: 2,
        nomorRumah: '05',
    },
]

const TabelHome = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('')

    const filteredData = initialData.filter((rumah) =>
        Object.values(rumah)
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    )

    return (
        <div className="container mx-auto flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <Input
                    placeholder="Cari..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <TambahHome />
            </div>

            <div className="flex flex-wrap -m-4">
                {filteredData.length === 0 ? (
                    <p className="text-gray-500 p-4">Tidak ditemukan rumah yang sesuai.</p>
                ) : (
                    filteredData.map((rumah) => {
                        const statusClass =
                            rumah.statusPenghuni === 'tetap'
                                ? 'bg-emerald-500'
                                : rumah.statusPenghuni === 'kontrak'
                                    ? 'bg-yellow-500'
                                    : 'bg-gray-400'

                        return (
                            <div className="p-4 lg:w-1/3" key={rumah.id}>
                                <div className="h-full bg-white bg-opacity-75 px-4 rounded-lg overflow-hidden relative flex shadow-lg hover:cursor-pointer" onClick={() => navigate("/panel/perumahan/detail")}>
                                    <div className="w-1/3 p-4 flex ">
                                        <div>
                                            <RiCloseFill size={14} className='hover:text-red-500' />
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <HiHomeModern size={60} color="#B9B4C7" />
                                        </div>

                                    </div>
                                    <div className="w-10/12 p-4 flex flex-col gap-4">
                                        <div className="flex justify-between items-center">
                                            <h1 className="font-semibold">{rumah.namaRumah}</h1>
                                            <Badge variant="secondary">No rumah.{rumah.nomorRumah}</Badge>
                                        </div>
                                        <p className="text-sm font-medium">{rumah.alamat}</p>
                                        <div className="flex justify-between items-center">
                                            <Badge className={statusClass}>
                                                {rumah.statusPenghuni.charAt(0).toUpperCase() +
                                                    rumah.statusPenghuni.slice(1)}
                                            </Badge>
                                            <Badge variant="secondary">
                                                Dihuni {rumah.jumlahPenghuni} orang
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default TabelHome
