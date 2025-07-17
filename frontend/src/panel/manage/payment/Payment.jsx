import React ,{useState, useEffect} from 'react'
import TablePayment from './tabelPayment/TablePayment'
import Tambah from './dialogPayment/Tambah'
import axios from 'axios';
import { API_URL } from "../../../helpers/networt";


const Payment = () => {
  const [tableData, setTableData] = useState([]);
    const fetchData = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${API_URL}/api/pembayaran-iuran`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log(response.data)
                const rawData = response.data.data;
                setTableData(rawData);
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
                <h1 className='text-2xl font-bold'>Pembayaran Iuran</h1>
                <Tambah fetchData={fetchData}/>
            </div>

            <div className='w-full bg-white py-3  px-8 rounded-2xl'>
               <TablePayment tableData={tableData} setTableData={setTableData} fetchData={fetchData}/>
            </div>
           
        </div>
  )
}

export default Payment
