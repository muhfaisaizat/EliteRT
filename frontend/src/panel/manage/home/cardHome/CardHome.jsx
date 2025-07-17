import React, { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { HiHomeModern } from 'react-icons/hi2'
import { Input } from '@/components/ui/input'
import TambahHome from '../dialogHome/TambahHome'
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'
import { RiCloseFill } from "react-icons/ri";
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";
import { useToast } from '@/hooks/use-toast';

const TabelHome = () => {
    const [initialData, setInitialData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();
    const navigate = useNavigate();
    const fetchData = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${API_URL}/api/rumah`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log(response.data.data)

                const rumahData = response.data.data.map((item) => ({
                    id: item.id,
                    namaRumah: item.nama_rumah,
                    alamat: item.alamat_rumah,
                    statusPenghuni: item.status_rumah.toLowerCase(),
                    jumlahPenghuni: item.penghuni_aktif.length,
                    nomorRumah: item.no_rumah,
                }));

                setInitialData(rumahData);

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
    }, []);


     const handleDelete = async (id) => {
        const token = localStorage.getItem("token");

        try {
            await axios.delete(`${API_URL}/api/rumah/${id}`, {
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

    const filteredData = initialData.filter((rumah) =>
        Object.values(rumah)
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <Input
                    placeholder="Cari..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <TambahHome fetchData={fetchData}/>
            </div>

            <div className="flex flex-wrap -m-4">
                {filteredData.length === 0 ? (
                    <p className="text-gray-500 w-full flex justify-center items-center p-20">No results.</p>
                ) : (
                    filteredData.map((rumah) => {
                        const statusClass =
                            rumah.statusPenghuni === 'tetap'
                                ? 'bg-emerald-500'
                                : rumah.statusPenghuni === 'kontrak'
                                    ? 'bg-yellow-500'
                                    : 'bg-gray-400';

                        return (
                            <div className="p-4 lg:w-1/3" key={rumah.id}>
                                <div
                                    className="h-full bg-white bg-opacity-75 px-4 rounded-lg overflow-hidden relative flex shadow-lg hover:cursor-pointer"
                                    
                                >
                                    <div className="w-1/3 p-4 flex">
                                        <div>
                                            <RiCloseFill size={14} className="hover:text-red-500" onClick={() => handleDelete(rumah.id)}/>
                                        </div>
                                        <div className="flex justify-center items-center" onClick={() => { localStorage.setItem("id_rumah", rumah.id); navigate(`/panel/perumahan/detail`);}}>
                                            <HiHomeModern size={60} color="#B9B4C7" />
                                        </div>
                                    </div>
                                    <div className="w-10/12 p-4 flex flex-col gap-4" onClick={() => { localStorage.setItem("id_rumah", rumah.id); navigate(`/panel/perumahan/detail`);}}>
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
                                                {rumah.jumlahPenghuni === 0
                                                    ? 'Tidak dihuni'
                                                    : `Dihuni ${rumah.jumlahPenghuni} orang`}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default TabelHome;
