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
            accessorKey: "nama_penghuni",
            header: "Nama Pembayar",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("nama_penghuni")}</div>
            ),
        },
        {
            accessorKey: "bulan",
            header: "Bulan",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("bulan")}</div>
            ),
        },
        {
            accessorKey: "tahun",
            header: "Tahun",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("tahun")}</div>
            ),
        },
        {
            accessorKey: "jenis_iuran",
            header: "Jenis Iuran",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("jenis_iuran")}</div>
            ),
        },
        {
            accessorKey: "tagihan",
            header: "Tagihan",
            cell: ({ row }) => (
                <div className="capitalize">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.getValue("tagihan"))}</div>
            ),
        },
        {
            accessorKey: "status_pembayaran",
            header: "Status Pembayaran",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("status_pembayaran")}</div>
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
                            <DropdownMenuItem onClick={() => { setOpenView(true); setDataToView(rowData); }}>Detail</DropdownMenuItem>
                            

                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },

        
    ].filter(Boolean);
};

