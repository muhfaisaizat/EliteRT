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
            accessorKey: "nama_lengkap",
            header: "Nama Penghuni",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("nama_lengkap")}</div>
            ),
        },
        
        {
            accessorKey: "tanggal_masuk",
            header: "Tanggal Masuk",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("tanggal_masuk")}</div>
            ),
        },
        {
            accessorKey: "tanggal_keluar",
            header: "Tanggal Keluar",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("tanggal_keluar")}</div>
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
                            
                            <DropdownMenuItem onClick={() => handleDelete(rowData.id)} className="text-red-500" >Hapus</DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },

        
    ].filter(Boolean);
};

