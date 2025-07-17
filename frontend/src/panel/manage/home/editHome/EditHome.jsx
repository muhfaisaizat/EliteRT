import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { RiCloseFill } from "react-icons/ri";
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";

const EditHome = ({ setShowEdit, showEdit, idRumah, data, fetchData }) => {
    const { toast } = useToast();

    // State per field
    const [nama, setNama] = useState("");
    const [nomor, setNomor] = useState("");
    const [alamat, setAlamat] = useState("");
    const [status, setStatus] = useState(data.status_rumah);

    // Penghuni
    const [people, setPeople] = useState([]);
    const [selectedIds, setSelectedIds] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchPenghuni = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${API_URL}/api/penghuni`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "*/*",
                    },
                });

                const allPenghuni = res.data.data || [];
                const penghuniAktif = data.penghuni_aktif || [];

                const penghuniAktifIds = penghuniAktif.map((item) => item.id_penghuni);

                const allPeople = allPenghuni
                    .filter((item) => !penghuniAktifIds.includes(item.id)) // hanya yang belum jadi penghuni rumah
                    .map((item) => ({
                        id: item.id,
                        name: item.nama_lengkap,
                    }));

                setPeople(allPeople);
            } catch (error) {
                console.error("Gagal mengambil data penghuni:", error);
            }
        };

        fetchPenghuni();

        setNama(data.nama_rumah || "");
        setNomor(data.no_rumah || "");
        setAlamat(data.alamat_rumah || "");
        setStatus(data.status_rumah);
    }, [data]);


    const handleToggle = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };


    const handleRemove = (id) => {
        setSelectedIds((prev) => prev.filter((item) => item !== id))
    }


    const filteredPeople = people.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const selectedPeople = people.filter((person) =>
        selectedIds.includes(person.id)
    )

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nama || !nomor || !alamat || !status) {
            toast({
                variant: "destructive",
                title: "Gagal menyimpan!",
                description: "Semua field wajib diisi.",
            });
            return;
        }

        const token = localStorage.getItem("token");

        try {
            // 1. Update Rumah
            await axios.put(`${API_URL}/api/rumah/${idRumah}`, {
                nama_rumah: nama,
                no_rumah: nomor,
                alamat_rumah: alamat,
                status_rumah: status,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "*/*",
                    "Content-Type": "application/json",
                }
            });

            // 2. Tambahkan Penghuni Baru
            for (const id_penghuni of selectedIds) {
                await axios.post(`${API_URL}/api/detail-penghuni`, {
                    id_rumah: idRumah,
                    id_penghuni: id_penghuni
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "*/*",
                        "Content-Type": "application/json",
                    }
                });
            }

            toast({
                title: "Berhasil!",
                description: "Data rumah dan penghuni berhasil diperbarui.",
            });

            fetchData(); // refresh data
            setShowEdit(false);

        } catch (error) {
            console.error("Gagal memperbarui rumah atau menambah penghuni:", error);
            toast({
                variant: "destructive",
                title: "Gagal!",
                description: "Terjadi kesalahan saat menyimpan.",
            });
        }
    };


    return (
        <form onSubmit={handleSubmit} className="grid gap-4 px-8 py-3">
            <div className="grid gap-2">
                <Label>Edit Rumah</Label>
                <Label>
                    Silakan lengkapi atau ubah informasi penghuni di form berikut. Pastikan data yang dimasukkan benar sebelum menekan tombol "Simpan".
                </Label>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="nama">Nama Rumah <span className="text-red-500">*</span></Label>
                <Input id="nama" value={nama} onChange={(e) => setNama(e.target.value)} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="nomor">No Rumah <span className="text-red-500">*</span></Label>
                <Input
                    id="nomor"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={nomor}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                            setNomor(value);
                        }
                    }}
                />

            </div>

            <div className="grid gap-2">
                <Label htmlFor="alamat">Alamat Rumah <span className="text-red-500">*</span></Label>
                <Input id="alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="status">Status Rumah <span className="text-red-500">*</span></Label>
                <Select
                    value={status}
                    onValueChange={(val) => setStatus(val)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="Tetap">Tetap</SelectItem>
                            <SelectItem value="Kontrak">Kontrak</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="penghuni">Pilih Penghuni</Label>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex justify-start w-full">
                            Pilih
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64">
                        <Input
                            placeholder="Cari nama..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="m-2 w-auto"
                        />
                        <DropdownMenuSeparator />
                        {filteredPeople.map((person) => (
                            <DropdownMenuCheckboxItem
                                key={person.id}
                                checked={selectedIds.includes(person.id)}
                                onCheckedChange={() => handleToggle(person.id)}
                            >
                                {person.name}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex gap-2 flex-wrap">
                    {selectedPeople.map((person) => (
                        <Badge key={person.id} className="flex items-center gap-1 pr-1">
                            {person.name}
                            <RiCloseFill
                                size={18}
                                className="cursor-pointer hover:text-red-500"
                                onClick={() => handleRemove(person.id)}
                            />
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => setShowEdit(!showEdit)}>Kembali</Button>
                <Button type="submit">Simpan</Button>
            </div>
        </form>
    );
};

export default EditHome;
