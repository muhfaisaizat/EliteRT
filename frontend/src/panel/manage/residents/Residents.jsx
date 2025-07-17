import React,{useState, useEffect} from 'react'
import TableResident from './tabelResident/TableResident'
import Tambah from './dialogResident/Tambah'
import axios from 'axios';
import { API_URL } from "../../../helpers/networt";




const Residents = () => {
    const [tableData, setTableData] = useState([]);
    const fetchData = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${API_URL}/api/penghuni`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log(response.data)
                const rawData = response.data.data;
    
               
                const formattedData = rawData.map((item) => ({
                    id: item.id,
                    "Nama Lengkap": item.nama_lengkap,
                    "Status Penghuni": item.status_tempat_tinggal || "-",
                    "Nomor Telepon": item.nomor_telepon,
                    "Status Perkawinan": item.status_perkawinan,
                    fotoKTP: item.foto_ktp,
                }));
    
                
                setTableData(formattedData);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
    
        useEffect(() => {
            fetchData();
        }, []);
    return (
        <div className=' w-full grid gap-8 py-3'>
            <div className='w-full px-4 flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Data Penghuni</h1>
                <Tambah fetchData={fetchData}/>
            </div>

            <div className='w-full bg-white py-3  px-8 rounded-2xl'>
                <TableResident tableData={tableData} setTableData={setTableData} fetchData={fetchData}/>
            </div>
           
        </div>
    )
}

export default Residents
