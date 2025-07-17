import React, { useState, useEffect } from "react";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { columns as createColumns } from "./ColumnsResident";
// import { data as initialData } from "./data";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Edit } from "lucide-react";
import { flexRender } from "@tanstack/react-table";
import EditPenghuni from "../dialogResident/Edit";
import ViewPenghuni from "../dialogResident/View";
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";
import { useToast } from '@/hooks/use-toast';


const TableResident = ({ tableData, setTableData, fetchData }) => {
    const { toast } = useToast();
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState("");

    const [openEdit, setOpenEdit] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [dataToView, setDataToView] = useState(null);




    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");

        try {
            await axios.delete(`${API_URL}/api/penghuni/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update data tabel
            setTableData((prev) => prev.filter((item) => item.id !== id));

            // Notifikasi sukses
            toast({
                title: "Berhasil!",
                description: "Data penghuni berhasil dihapus.",
            });
        } catch (error) {
            console.error("Gagal menghapus data:", error);

            // Notifikasi gagal
            toast({
                variant: "destructive",
                title: "Gagal menghapus!",
                description: "Terjadi kesalahan saat menghapus data.",
            });
        }
    };

    const table = useReactTable({
        data: tableData,
        columns: createColumns(handleDelete, rowSelection, setOpenEdit, setDataToEdit, setOpenView, setDataToView),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: (row, columnId, filterValue) => {

            if (columnId === "action") return true;

            const value = row.getValue(columnId);
            if (typeof value === "string" || typeof value === "number") {
                return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
            }
            return false;
        },
    });



    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Cari..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Kolom <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Kembali
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Selanjutnya
                    </Button>
                </div>
            </div>
            <EditPenghuni open={openEdit} setOpen={setOpenEdit} data={dataToEdit} fetchData={fetchData} />
            <ViewPenghuni open={openView} setOpen={setOpenView} data={dataToView} />
        </div>
    );
};

export default TableResident
