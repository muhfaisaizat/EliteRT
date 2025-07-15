import { useState } from "react";
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
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

const Tambah = () => {
    const { toast } = useToast();
    const [lainnyaChecked, setLainnyaChecked] = useState(false);


    const [formData, setFormData] = useState({
        nama: "",
        status: "",
        telepon: "",
        perkawinan: "",
        foto: null,
    });

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { nama, status, telepon, perkawinan, foto } = formData;

        if (!nama || !status || !telepon || !perkawinan || !foto) {
            toast({
                variant: "destructive",
                title: "Gagal menyimpan!",
                description: "Semua field wajib diisi.",
            });
            return;
        }


        toast({
            title: "Berhasil!",
            description: "Data penghuni berhasil ditambahkan.",
        });


        setFormData({
            nama: "",
            status: "",
            telepon: "",
            perkawinan: "",
            foto: null,
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Tambah</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Tambah Pengeluaran</DialogTitle>
                        <DialogDescription>
                            Lengkapi informasi Pengeluaran dengan benar pada form di bawah ini. Tekan tombol "Simpan" untuk menyimpan data.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="nama">Nama Pengeluaran <span className="text-red-500">*</span></Label>
                            <Input id="nama" value={formData.nama} onChange={handleChange} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="telepon">Kategori <span className="text-red-500">*</span></Label>
                            {lainnyaChecked ? (
                                <Input id="jenisIuran" value={formData.jenisIuran} onChange={handleChange} />
                            ) : (
                                <Select >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih " />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Gaji Satpam">Gaji Satpam</SelectItem>
                                            <SelectItem value="Alat Kebersihan">Alat Kebersihan</SelectItem>
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
                                    Lainnya
                                </label>
                            </div>

                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="perkawinan">Jumlah pengeluaran <span className="text-red-500">*</span></Label>
                            <Input id="telepon" value={formData.telepon} onChange={handleChange} />
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
