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
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";

const Tambah = ({ open, setOpen, data, fetchData }) => {
    const { toast } = useToast();
    const [lainnyaChecked, setLainnyaChecked] = useState(false);
    const kategoriOptions = ["Gaji Satpam", "Alat Kebersihan"];
    const [id, setID] = useState("")

    const [formData, setFormData] = useState({
        nama: "",
        kategori: "",
        jumlah_pengeluaran: "",
        keterangan: "",
    });

    const formatRupiah = (value) => {

        const numberString = value.replace(/[^\d]/g, "");

        return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    useEffect(() => {
        if (data) {
            const kategoriLainnya = !kategoriOptions.includes(data.kategori || "");
            setFormData({
                nama: data.nama_pengeluaran || "",
                kategori: data.kategori || "",
                jumlah_pengeluaran: data.jumlah_pengeluaran?.toString() || "",
                keterangan: data.keterangan || "",
            });
            setLainnyaChecked(kategoriLainnya);
            setID(data.id);
        }
    }, [data]);

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        if (id === "jumlah_pengeluaran") {

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
        const token = localStorage.getItem("token");

        const cleanedJumlah = formData.jumlah_pengeluaran.replace(/\./g, "");

        try {
            await axios.post(
                `${API_URL}/api/pengeluaran`,
                {
                    nama_pengeluaran: formData.nama,
                    kategori: formData.kategori,
                    jumlah_pengeluaran: parseInt(cleanedJumlah),
                    keterangan: formData.keterangan || "",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            toast({
                title: "Berhasil",
                description: "Data pengeluaran berhasil disimpan.",
            });


            fetchData();
        } catch (error) {
            console.error("Error saat mengirim data:", error);
            toast({
                variant: "destructive",
                title: "Gagal menyimpan",
                description: "Terjadi kesalahan saat menyimpan data.",
            });
        }
    };

    return (
        <Dialog >
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
                                <Input id="kategori" value={formData.kategori} onChange={handleChange} />
                            ) : (
                                <Select
                                    value={formData.kategori}
                                    onValueChange={(val) => setFormData((prev) => ({ ...prev, kategori: val }))}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {kategoriOptions.map((kategori) => (
                                                <SelectItem key={kategori} value={kategori}>{kategori}</SelectItem>
                                            ))}
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
                            <Input id="jumlah_pengeluaran" value={formData.jumlah_pengeluaran} onChange={handleChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="statusPembayaran">Keterangan</Label>
                            <Textarea id="keterangan" value={formData.keterangan} onChange={handleChange} />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Kembali</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit"  >Simpan</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Tambah;
