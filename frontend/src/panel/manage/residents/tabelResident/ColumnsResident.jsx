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
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },

        {
            accessorKey: "Nama Lengkap",
            header: "Nama Lengkap",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("Nama Lengkap")}</div>
            ),
        },
        {
            accessorKey: "Status Penghuni",
            header: "Status Penghuni",
            cell: ({ row }) => (
                (() => {
                    const status = row.getValue("Status Penghuni");
                    const statusClass =
                        status === "tetap"
                            ? "bg-emerald-500"
                            : status === "kontrak"
                                ? "bg-yellow-500"
                                : "bg-gray-400";

                    return (
                        <div className="capitalize ">
                            <Badge className={statusClass}>
                                {status}
                            </Badge>
                        </div>
                    );
                })()
            ),
        },
        {
            accessorKey: "Nomor Telepon",
            header: "Nomor Telepon",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("Nomor Telepon")}</div>
            ),
        },
        {
            accessorKey: "Status Perkawinan",
            header: "Status Perkawinan",
            cell: ({ row }) => (
                (() => {
                    const status = row.getValue("Status Perkawinan");
                    const statusClass =
                        status === "Sudah menikah"
                            ? "bg-blue-600"
                            : status === "Belum menikah"
                                ? "bg-cyan-600"
                                : "bg-gray-400";

                    return (
                        <div className="capitalize ">
                            <Badge className={statusClass}>
                                {status}
                            </Badge>
                        </div>
                    );
                })()
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

                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },

        {
            id: "delete",
            header: "",
            enableHiding: false,
            cell: ({ row }) => {
                const isSelected = row.getIsSelected();
                return isSelected ? (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(row.original.id)}
                    >
                        Hapus
                    </Button>
                ) : null;
            },
        },
    ].filter(Boolean);
};

