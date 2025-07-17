import React,{useEffect, useState} from 'react'
import Tambah from './dialogExpenditure/Tambah'
import TableExpenditure from './tabelExpenditure/TableExpenditure'
import axios from 'axios';
import { API_URL } from "../../../helpers/networt";

const Expenditure = () => {
  const [tableData, setTableData] = useState([]);
    const fetchData = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${API_URL}/api/pengeluaran`, {
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
                <h1 className='text-2xl font-bold'>Pengeluaran</h1>
                <Tambah fetchData={fetchData}/>
            </div>

            <div className='w-full bg-white py-3  px-8 rounded-2xl'>
                <TableExpenditure tableData={tableData} setTableData={setTableData} fetchData={fetchData}/>
            </div>
           
        </div>
  )
}

export default Expenditure
