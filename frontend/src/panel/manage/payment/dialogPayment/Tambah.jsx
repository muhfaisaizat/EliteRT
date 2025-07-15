import React, { useState } from "react";
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

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

const Tambah = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const { toast } = useToast();
    const [lainnyaChecked, setLainnyaChecked] = useState(false);


    const [formData, setFormData] = useState({
        namaRumah: "",
        namaPembayar: "",
        bulan: "",
        tahun: "",
        jenisIuran: "",
        tagihan: "",
        statusPembayaran: "",
    });



    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { namaRumah, namaPembayar, bulan, tahun, jenisIuran, tagihan, statusPembayaran } = formData;

        if (!namaRumah || !namaPembayar || !bulan || !tahun || !jenisIuran || !tagihan || !statusPembayaran) {
            toast({
                variant: "destructive",
                title: "Gagal menyimpan!",
                description: "Semua field wajib diisi.",
            });
            return;
        }

        toast({
            title: "Berhasil!",
            description: "Data iuran berhasil ditambahkan.",
        });

        setFormData({
            namaRumah: "",
            namaPembayar: "",
            bulan: "",
            tahun: "",
            jenisIuran: "",
            tagihan: "",
            statusPembayaran: "",
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Tambah</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Tambah Pembayaran</DialogTitle>
                        <DialogDescription>
                            Lengkapi informasi pembayaran dengan benar.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="namaRumah">Nama Rumah <span className="text-red-500">*</span></Label>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between"
                                    >
                                        {value
                                            ? frameworks.find((framework) => framework.value === value)?.label
                                            : "Select framework..."}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search framework..." className="h-9" />
                                        <CommandList>
                                            <CommandEmpty>No framework found.</CommandEmpty>
                                            <CommandGroup>
                                                {frameworks.map((framework) => (
                                                    <CommandItem
                                                        key={framework.value}
                                                        value={framework.value}
                                                        onSelect={(currentValue) => {
                                                            setValue(currentValue === value ? "" : currentValue)
                                                            setOpen(false)
                                                        }}
                                                    >
                                                        {framework.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                value === framework.value ? "opacity-100" : "opacity-0"
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
                            <Label htmlFor="namaPembayar">Nama Pembayar <span className="text-red-500">*</span></Label>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between"
                                    >
                                        {value
                                            ? frameworks.find((framework) => framework.value === value)?.label
                                            : "Select framework..."}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search framework..." className="h-9" />
                                        <CommandList>
                                            <CommandEmpty>No framework found.</CommandEmpty>
                                            <CommandGroup>
                                                {frameworks.map((framework) => (
                                                    <CommandItem
                                                        key={framework.value}
                                                        value={framework.value}
                                                        onSelect={(currentValue) => {
                                                            setValue(currentValue === value ? "" : currentValue)
                                                            setOpen(false)
                                                        }}
                                                    >
                                                        {framework.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                value === framework.value ? "opacity-100" : "opacity-0"
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
                                <Input id="jenisIuran" value={formData.jenisIuran} onChange={handleChange} />
                            ) : (
                                <Select >
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
                            <Select onValueChange={(value) => setFormData({ ...formData, statusPembayaran: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Lunas">Lunas</SelectItem>
                                        <SelectItem value="Belum Lunas">Belum Lunas</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="statusPembayaran">Pembayaran Lewat<span className="text-red-500">*</span></Label>
                            <Select onValueChange={(value) => setFormData({ ...formData, statusPembayaran: value })}>
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
                             <Textarea placeholder="Tulis disini...." />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Kembali</Button>
                        </DialogClose>
                        <Button type="submit">Simpan</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Tambah;
