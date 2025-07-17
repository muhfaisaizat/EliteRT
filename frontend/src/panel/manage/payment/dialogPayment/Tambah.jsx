import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";



const Tambah = ({ fetchData }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState("");
    const [rumahList, setRumahList] = useState([]);
    const [pembayarList, setPembayarList] = useState([]);
    const { toast } = useToast();
    const [lainnyaChecked, setLainnyaChecked] = useState(false);


    const fetchDataRumah = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_URL}/api/pembayaran-iuran/rumah`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = res.data.data.map((item) => ({
                value: String(item.id),
                label: item.nama_rumah,
            }));

            setRumahList(data);
        } catch (err) {
            console.error("Gagal mengambil data rumah:", err);
        }
    };

    useEffect(() => {
        fetchDataRumah();
    }, []);

    useEffect(() => {
        if (!value) return;

        const fetchPenghuni = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${API_URL}/api/pembayaran-iuran/rumah/${value}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = res.data.data.map((item) => ({
                    value: String(item.id),
                    label: item.nama_lengkap,
                }));

                setPembayarList(data);
            } catch (err) {
                // console.error("Gagal mengambil data penghuni:", err);
                setPembayarList([]);
            }
        };

        fetchPenghuni();
    }, [value]);


    const formatRupiah = (value) => {

        const numberString = value.replace(/[^\d]/g, "");

        return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };


    const [formData, setFormData] = useState({
        namaRumah: "",
        namaPembayar: "",
        bulan: "",
        tahun: "",
        jenisIuran: "",
        tagihan: "",
        statusPembayaran: "",
        metodePembayaran: "",
        keterangan: "",
    });



    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "tagihan") {

            const formatted = formatRupiah(value);
            setFormData((prev) => ({
                ...prev,
                [id]: formatted,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [id]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            console.log(formData.statusPembayaran)

            const payload = {
                id_rumah: Number(value),
                id_penghuni: Number(value1),
                bulan: formData.bulan,
                tahun: Number(formData.tahun),
                jenis_iuran: formData.jenisIuran,
                tagihan: Number(formData.tagihan.replace(/\./g, "")),
                status_pembayaran: formData.statusPembayaran,
                metode_pembayaran: formData.metodePembayaran,
                keterangan: formData.keterangan,
            };

            await axios.post(`${API_URL}/api/pembayaran-iuran`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            toast({ title: "Berhasil", description: "Data iuran berhasil ditambahkan." });
            setOpen(false);
            fetchData();
            setFormData({
                namaRumah: "",
                namaPembayar: "",
                bulan: "",
                tahun: "",
                jenisIuran: "",
                tagihan: "",
                statusPembayaran: "",
                metodePembayaran: "",
                keterangan: "",
            });
        } catch (error) {
            console.error("Gagal tambah data:", error);
            toast({ title: "Gagal", description: "Data gagal ditambahkan.", variant: "destructive" });
        }
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Tambah</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] py-14">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Tambah Pembayaran</DialogTitle>
                        <DialogDescription>
                            Lengkapi informasi pembayaran dengan benar.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="namaRumah">
                                Nama Rumah <span className="text-red-500">*</span>
                            </Label>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between"
                                    >
                                        {value
                                            ? rumahList.find((r) => r.value === value)?.label
                                            : "Pilih rumah..."}
                                        <ChevronsUpDown className="opacity-50 h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Cari rumah..." className="h-9" />
                                        <CommandList>
                                            <CommandEmpty>Rumah tidak ditemukan.</CommandEmpty>
                                            <CommandGroup>
                                                {rumahList.map((rumah) => (
                                                    <CommandItem
                                                        key={rumah.value}
                                                        value={rumah.value}
                                                        onSelect={(currentValue) => {
                                                            setValue(currentValue === value ? "" : currentValue);
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        {rumah.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                value === rumah.value ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="namaPembayar">
                                Nama Pembayar <span className="text-red-500">*</span>
                            </Label>
                            <Popover open={open1} onOpenChange={setOpen1}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open1}
                                        className="w-full justify-between"
                                    >
                                        {value1
                                            ? pembayarList.find((item) => item.value === value1)?.label
                                            : "Pilih nama pembayar..."}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Cari nama..." className="h-9" />
                                        <CommandList>
                                            <CommandEmpty>Data tidak ditemukan.</CommandEmpty>
                                            <CommandGroup>
                                                {pembayarList.map((item) => (
                                                    <CommandItem
                                                        key={item.value}
                                                        value={item.value}
                                                        onSelect={(currentValue) => {
                                                            setValue1(currentValue === value1 ? "" : currentValue);
                                                            setOpen1(false);
                                                        }}
                                                    >
                                                        {item.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                value1 === item.value ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="bulan">Bulan <span className="text-red-500">*</span></Label>
                            <Input id="bulan" value={formData.bulan} onChange={handleChange} placeholder="Contoh: Januari" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="tahun">Tahun <span className="text-red-500">*</span></Label>
                            <Input id="tahun" value={formData.tahun} onChange={handleChange} placeholder="Contoh: 2025" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="jenisIuran">Jenis Iuran <span className="text-red-500">*</span></Label>
                            {lainnyaChecked ? (
                                <Input id="jenisIuran" value={formData.jenisIuran} onChange={handleChange} required />
                            ) : (
                                <Select
                                    value={formData.jenisIuran}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            jenisIuran: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih Iuran" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Satpam">Satpam</SelectItem>
                                            <SelectItem value="Kebersihan">Kebersihan</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    checked={lainnyaChecked}
                                    onCheckedChange={(checked) => setLainnyaChecked(!!checked)}
                                    id="terms" />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Iuran Lainnya
                                </label>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="tagihan">Tagihan <span className="text-red-500">*</span></Label>
                            <Input id="tagihan" value={formData.tagihan} onChange={handleChange} placeholder="Contoh: 100000" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="statusPembayaran">Status Pembayaran <span className="text-red-500">*</span></Label>
                            <Select value={formData.statusPembayaran} onValueChange={(value) => setFormData({ ...formData, statusPembayaran: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="lunas">Lunas</SelectItem>
                                        <SelectItem value="belum bayar">Belum Lunas</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="statusPembayaran">Metode Pembayaran<span className="text-red-500">*</span></Label>
                            <Select value={formData.metodePembayaran} onValueChange={(value) => setFormData({ ...formData, metodePembayaran: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Cash">Cash</SelectItem>
                                        <SelectItem value="Transfer">Transfer</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="statusPembayaran">Keterangan</Label>
                            <Textarea id="keterangan" placeholder="Tulis disini...." value={formData.keterangan} onChange={handleChange} />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Kembali</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit">Simpan</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Tambah;
