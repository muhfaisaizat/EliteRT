import React from 'react';

import { HiMiniPresentationChartLine } from "react-icons/hi2";
import { FaBagShopping } from "react-icons/fa6";
import { FaBox } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const DataCard = ({ dataCard }) => {
    const navigate = useNavigate();
   

    const data = dataCard;

    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap -m-4">
                {/* Kartu Saldo */}
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                    <div className='border-2 bg-white rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                        <div className='flex justify-between'>
                            <h1 className='text-[14px] font-semibold'>Saldo</h1>
                            <HiMiniPresentationChartLine size="16" color="#717179" />
                        </div>
                        <div className='grid gap-[4px]'>
                            <p className='text-[24px] font-semibold'>
                                Rp {Number(data.total_saldo).toLocaleString('id-ID')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Kartu Pengeluaran */}
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                    <div className='border-2 bg-white rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                        <div className='flex justify-between'>
                            <h1 className='text-[14px] font-semibold'>Total Pengeluaran</h1>
                            <HiMiniPresentationChartLine size="16" color="#717179" />
                        </div>
                        <div className='grid gap-[4px]'>
                            <p className='text-[24px] font-semibold'>
                                Rp {Number(data.total_pengeluaran).toLocaleString('id-ID')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Kartu Metode Pembayaran Terbanyak */}
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                    <div className='border-2 bg-white rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                        <div className='flex justify-between'>
                            <h1 className='text-[14px] font-semibold'>Pembayaran Paling Sering</h1>
                            <FaBox size="16" color="#717179" />
                        </div>
                        <div className='grid gap-[4px]'>
                            <p className='text-[24px] font-semibold'>{data.metode_pembayaran || '-'}</p>
                            <p className='text-[12px] font-medium text-emerald-500'>
                                {data.jumlah_metode} transaksi
                            </p>
                        </div>
                    </div>
                </div>

                {/* Kartu Iuran Belum Lunas */}
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                    <div className='border-2 bg-white rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                        <div className='flex justify-between'>
                            <h1 className='text-[14px] font-semibold'>Iuran Belum Lunas</h1>
                            <FaBox size="16" color="#717179" />
                        </div>
                        <div className='grid gap-[4px]'>
                            <p className='text-[24px] font-semibold'>
                                {data.jumlah_belum_bayar ?? 0}
                            </p>
                            <div className='flex items-center gap-4 hover:cursor-pointer' onClick={() => navigate("/panel/pembayaran")}>
                                <p className='text-[12px] font-medium'>
                                    Cek Sekarang
                                </p>
                                <FaArrowRightLong size={18} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataCard;
