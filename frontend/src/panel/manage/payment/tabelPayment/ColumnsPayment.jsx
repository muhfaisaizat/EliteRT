import React from "react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge"




export const columns = (handleDelete, rowSelection, setOpenEdit, setDataToEdit, setOpenView, setDataToView) => {
    const isAnyRowSelected = Object.keys(rowSelection).length > 0;


    return [
       

        {
            accessorKey: "Nama Rumah",
            header: "Nama Rumah",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("Nama Rumah")}</div>
            ),
        },
        {
            accessorKey: "Nama Pembayar",
            header: "Nama Pembayar",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("Nama Pembayar")}</div>
            ),
        },
        {
            accessorKey: "Bulan",
            header: "Bulan",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("Bulan")}</div>
            ),
        },
        {
            accessorKey: "Tahun",
            header: "Tahun",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("Tahun")}</div>
            ),
        },
        {
            accessorKey: "Jenis Iuran",
            header: "Jenis Iuran",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("Jenis Iuran")}</div>
            ),
        },
        {
            accessorKey: "Tagihan",
            header: "Tagihan",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("Tagihan")}</div>
            ),
        },
        {
            accessorKey: "Status Pembayaran",
            header: "Status Pembayaran",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("Status Pembayaran")}</div>
            ),
        },
        {
            accessorKey: "Tanggal",
            header: "Tanggal",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("Tanggal")}</div>
            ),
        },
        
        
        


        !isAnyRowSelected && {
            id: "actions",
             header: "Aksi",
            cell: ({ row }) => {
                const rowData = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => { setOpenView(true); setDataToView(rowData); }}>Lihat Detail</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setOpenEdit(true); setDataToEdit(rowData); }} >Edit Penghuni</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setOpenEdit(true); setDataToEdit(rowData); }} className="text-red-500" >Hapus</DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },

        
    ].filter(Boolean);
};

