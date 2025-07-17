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
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";


const Tambah = ({ fetchData }) => {
    const { toast } = useToast();


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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { nama, status, telepon, perkawinan, foto } = formData;

        if (!nama || !telepon || !perkawinan || !foto) {
            toast({
                variant: "destructive",
                title: "Gagal menyimpan!",
                description: "Semua field wajib diisi.",
            });
            setFormData({
                nama: "",
                status: "",
                telepon: "",
                perkawinan: "",
                foto: null,
            }
            )
            return;
        }

        const token = localStorage.getItem("token");
        const payload = new FormData();

        payload.append("nama_lengkap", nama);
        payload.append("nomor_telepon", telepon);
        payload.append("status_perkawinan", perkawinan);
        payload.append("foto_ktp", foto);

        try {
            await axios.post(`${API_URL}/api/penghuni`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            toast({
                title: "Berhasil!",
                description: "Data penghuni berhasil ditambahkan.",
            });

            // Reset form
            setFormData({
                nama: "",
                status: "",
                telepon: "",
                perkawinan: "",
                foto: null,
            });

            fetchData();

        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Gagal menyimpan!",
                description: "Terjadi kesalahan saat mengirim data.",
            });
        }
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Tambah</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Tambah Penghuni</DialogTitle>
                        <DialogDescription>
                            Lengkapi informasi penghuni dengan benar pada form di bawah ini. Tekan tombol "Simpan" untuk menyimpan data.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="nama">Nama Lengkap <span className="text-red-500">*</span></Label>
                            <Input id="nama" value={formData.nama} onChange={handleChange} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="telepon">Nomor Telepon <span className="text-red-500">*</span></Label>
                            <Input
                                id="telepon"
                                type="tel"
                                value={formData.telepon}
                                onChange={(e) => {
                                    const numericValue = e.target.value.replace(/\D/g, "");
                                    setFormData((prev) => ({
                                        ...prev,
                                        telepon: numericValue,
                                    }));
                                }}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="perkawinan">Status Perkawinan <span className="text-red-500">*</span></Label>
                            <Select value={formData.perkawinan} onValueChange={(val) =>
                                setFormData((prev) => ({ ...prev, perkawinan: val }))
                            }>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Sudah menikah">Sudah menikah</SelectItem>
                                        <SelectItem value="Belum menikah">Belum menikah</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="foto">Foto KTP <span className="text-red-500">*</span></Label>
                            <Input id="foto" type="file" onChange={handleChange} />
                            <p className="text-sm">Unggah file dengan ukuran maksimal 5MB</p>
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
