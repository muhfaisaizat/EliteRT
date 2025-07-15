import React from 'react';

import { HiMiniPresentationChartLine } from "react-icons/hi2";
import { FaBagShopping } from "react-icons/fa6";
import { FaBox } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const DataCard = ({ dataSum }) => {
    const navigate = useNavigate();
    const dummyData = {
        Total_Penjualan: 12000000,
        Rata_Rata_Total_Penjualan_Per_Hari: 400000,
        Produk_Terjual: 120,
        Rata_Rata_Produk_Terjual_Per_Hari: 10,
        Pembayaran_Paling_Sering: "Transfer",
        Transaksi_Pembayaran_Paling_Sering: 65,
        Produk_Terlaris: 20,
        Transaksi_Produk_Terlaris: 45,
    };

    const data = dataSum || dummyData;

    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap -m-4">
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                    <div className='border-2 bg-white rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                        <div className='flex justify-between'>
                            <h1 className='text-[14px] font-semibold'>Saldo</h1>
                            <HiMiniPresentationChartLine size="16" color="#717179" />
                        </div>
                        <div className='grid gap-[4px]'>
                            <p className='text-[24px] font-semibold'>
                                {data.Total_Penjualan > 0 ? `Rp ${Number(data.Total_Penjualan).toLocaleString('id-ID')}` : '0'}
                            </p>
                            {data.Rata_Rata_Total_Penjualan_Per_Hari !== null && (
                                <p className={`text-[12px] font-medium ${data.Rata_Rata_Total_Penjualan_Per_Hari > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    Rp {Number(data.Rata_Rata_Total_Penjualan_Per_Hari).toLocaleString('id-ID')} Rata-Rata Perhari
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                    <div className='border-2 bg-white rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                        <div className='flex justify-between'>
                            <h1 className='text-[14px] font-semibold'>Pengeluaran</h1>
                            <FaBagShopping size="16" color="#717179" />
                        </div>
                        <div className='grid gap-[4px]'>
                            <p className='text-[24px] font-semibold'>{data.Produk_Terjual || 0}</p>
                            {data.Rata_Rata_Produk_Terjual_Per_Hari !== null && (
                                <p className={`text-[12px] font-medium ${data.Rata_Rata_Produk_Terjual_Per_Hari > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {data.Rata_Rata_Produk_Terjual_Per_Hari} Rata-Rata Perhari
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                    <div className='border-2 bg-white rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                        <div className='flex justify-between'>
                            <h1 className='text-[14px] font-semibold'>Pembayaran Paling Sering</h1>
                            <FaBox size="16" color="#717179" />
                        </div>
                        <div className='grid gap-[4px]'>
                            <p className='text-[24px] font-semibold'>{data.Pembayaran_Paling_Sering || '-'}</p>
                            {data.Transaksi_Pembayaran_Paling_Sering !== null && (
                                <p className='text-[12px] font-medium text-emerald-500'>
                                    {data.Transaksi_Pembayaran_Paling_Sering} transaksi
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                    <div className='border-2 bg-white rounded-[8px] grid gap-[8px] p-[24px] h-full'>
                        <div className='flex justify-between'>
                            <h1 className='text-[14px] font-semibold'>Iuran Belum Lunas</h1>
                            <FaBox size="16" color="#717179" />
                        </div>
                        <div className='grid gap-[4px]'>
                            <p className='text-[24px] font-semibold'>{data.Produk_Terlaris || '-'}</p>
                            <div className='flex items-center gap-4 hover:cursor-pointer' onClick={() => navigate("/pembayaran")}>
                                <p className='text-[12px] font-medium '>
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
