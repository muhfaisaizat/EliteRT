import React from 'react'
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


const Dashboard = () => {
    return (
        <div className=' w-full grid gap-8 py-3'>
            <div className='w-full px-4 flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Dashboard</h1>
                <Select>
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

            <DataCard />

            <ChartAreaInteractive/>

        </div>
    )
}

export default Dashboard
