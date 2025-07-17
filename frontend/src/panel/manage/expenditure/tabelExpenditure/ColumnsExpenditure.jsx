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
            accessorKey: "nama_pengeluaran",
            header: "Nama Pengeluaran",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("nama_pengeluaran")}</div>
            ),
        },

        {
            accessorKey: "kategori",
            header: "Kategori",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("kategori")}</div>
            ),
        },
        {
            accessorKey: "jumlah_pengeluaran",
            header: "Jumlah pengeluaran",
            cell: ({ row }) => (
                <div className="capitalize">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.getValue("jumlah_pengeluaran"))}</div>
            ),
        },
        {
            accessorKey: "keterangan",
            header: "Keterangan",
            cell: ({ row }) => {
                const value = row.getValue("keterangan");
                return <div className="capitalize">{value ? (value.length > 100 ? value.slice(0, 100) + "..." : value) : "-"}</div>;
            },
        },
        {
            accessorKey: "created_at",
            header: "Tanggal",
            cell: ({ row }) => {
                const fullDate = row.getValue("created_at");
                const dateOnly = fullDate ? fullDate.substring(0, 10) : "-";
                return <div className="capitalize">{dateOnly}</div>;
            },
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
                            <DropdownMenuItem onClick={() => { setOpenEdit(true); setDataToEdit(rowData); }} >Edit Pengeluaran</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(rowData.id)} className="text-red-500" >Hapus</DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },


    ].filter(Boolean);
};

