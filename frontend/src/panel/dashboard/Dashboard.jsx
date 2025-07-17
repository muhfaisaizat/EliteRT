import React,{useState, useEffect} from 'react'
import DataCard from './Card/DataCard'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import ChartAreaInteractive from './Chart/ChartAreaInteractive'
import axios from 'axios';
import { API_URL } from "../../helpers/networt";


const Dashboard = () => {
    const [cardData, setCardData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [periode, setPeriode] = useState('bulan');
    const fetchData = async () => {
        
        try {
             const token = localStorage.getItem("token");
             const [cardRes, chartRes] = await Promise.all([
                axios.get(`${API_URL}/api/dashboard/card?periode=${periode}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                }),
                axios.get(`${API_URL}/api/dashboard/chart`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                })
            ]);
            // console.log(cardRes.data)
            setCardData(cardRes.data);
            setChartData(chartRes.data);
        } catch (error) {
            console.error("Gagal memuat data dashboard", error);
        }
    }
     useEffect(() => {
        fetchData();
    }, [periode]);
    return (
        <div className=' w-full grid gap-8 py-3'>
            <div className='w-full px-4 flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Dashboard</h1>
                 <Select onValueChange={(value) => {
                    if (value === 'Bulan ini') setPeriode('bulan');
                    else if (value === 'Tahun ini') setPeriode('tahun');
                    else setPeriode('semua');
                }}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="Bulan ini">Bulan ini</SelectItem>
                            <SelectItem value="Tahun ini">Tahun ini</SelectItem>
                            <SelectItem value="All Tahun">Sepanjang Waktu</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <DataCard dataCard={cardData}/>

            <ChartAreaInteractive chartDataDB={chartData}/>

        </div>
    )
}

export default Dashboard
