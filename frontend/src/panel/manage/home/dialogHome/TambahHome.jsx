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


const TambahHome = ({fetchData}) => {
  const { toast } = useToast();






  const [formData, setFormData] = useState({
    nama_rumah: "",
    no_rumah: "",
    alamat_rumah: "",
    status_rumah: "",
    kondisi_rumah: "Tidak Dihuni", // default
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

    const { nama_rumah, no_rumah, alamat_rumah, status_rumah, kondisi_rumah } = formData;

    if (!nama_rumah || !no_rumah || !alamat_rumah || !status_rumah) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan!",
        description: "Semua field wajib diisi.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(`${API_URL}/api/rumah`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      toast({
        title: "Berhasil!",
        description: "Data rumah berhasil ditambahkan.",
      });

      setFormData({
        nama_rumah: "",
        no_rumah: "",
        alamat_rumah: "",
        status_rumah: "",
        kondisi_rumah: "Tidak Dihuni",
      });

      fetchData()

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan!",
        description: error.response?.data?.message || "Terjadi kesalahan.",
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
            <DialogTitle>Tambah Rumah</DialogTitle>
            <DialogDescription>
              Lengkapi informasi rumah dengan benar pada form di bawah ini. Tekan tombol "Simpan" untuk menyimpan data.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nama_rumah">Nama Rumah <span className="text-red-500">*</span></Label>
              <Input id="nama_rumah" value={formData.nama_rumah} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="no_rumah">No Rumah <span className="text-red-500">*</span></Label>
              <Input id="no_rumah" value={formData.no_rumah} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="alamat_rumah">Alamat Rumah <span className="text-red-500">*</span></Label>
              <Input id="alamat_rumah" value={formData.alamat_rumah} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status_rumah">Status Rumah <span className="text-red-500">*</span></Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status_rumah: value }))
                }
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
  )
}

export default TambahHome

