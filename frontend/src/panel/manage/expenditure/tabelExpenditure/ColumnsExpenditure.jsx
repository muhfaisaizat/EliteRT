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
            accessorKey: "Nama Pengeluaran",
            header: "Nama Pengeluaran",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("Nama Pengeluaran")}</div>
            ),
        },
        
        {
            accessorKey: "Kategori",
            header: "Kategori",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("Kategori")}</div>
            ),
        },
        {
            accessorKey: "Jumlah pengeluaran",
            header: "Jumlah pengeluaran",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("Jumlah pengeluaran")}</div>
            ),
        },
        {
            accessorKey: "Keterangan",
            header: "Keterangan",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("Keterangan")}</div>
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

