import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Residents from '../manage/residents/Residents';
import { Routes, Route } from 'react-router-dom';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Toaster } from "@/components/ui/toaster"
import Home from '../manage/home/Home';
import ViewDetailHome from '../manage/home/viewDetailHome/ViewDetailHome';
import Payment from '../manage/payment/Payment';
import Expenditure from '../manage/expenditure/Expenditure';
import Dashboard from '../dashboard/Dashboard';






const Main = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full bg-slate-100 flex flex-col h-screen'>
        <div className='w-full border px-4 py-3 bg-white'>
          <SidebarTrigger />
        </div>
        <ScrollArea className='w-full h-screen px-4 py-3'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pembayaran" element={<Payment />} />
            <Route path="/penghuni" element={<Residents />} />
            <Route path="/pengeluaran" element={<Expenditure />} />
            <Route path="/perumahan" element={<Home />} />
            <Route path="/perumahan/detail" element={<ViewDetailHome />} />
          </Routes>
           <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </main>
      <Toaster />
    </SidebarProvider>
  );
};

export default Main;
