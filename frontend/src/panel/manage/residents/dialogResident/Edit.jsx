import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";
import { useToast } from '@/hooks/use-toast';

const EditPenghuni = ({ open, setOpen, data, fetchData }) => {
  const { toast } = useToast();
  const [statusPerkawinan, setStatusPerkawinan] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [ktpFile, setKtpFile] = useState(null);

  useEffect(() => {
    if (data) {
      setNamaLengkap(data["Nama Lengkap"] || "");
      setNomorTelepon(data["Nomor Telepon"] || "");
      setStatusPerkawinan(data["Status Perkawinan"] || "");
    }
  }, [data]);
  const handleEditData = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("nama_lengkap", namaLengkap);
    formData.append("nomor_telepon", nomorTelepon);
    formData.append("status_perkawinan", statusPerkawinan);

    if (ktpFile) {
      formData.append("foto_ktp", ktpFile);
    }

    try {
      await axios.post(`${API_URL}/api/penghuni/update/${data.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Berhasil!",
        description: "Data penghuni berhasil diperbarui.",
      });

      setOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat memperbarui data.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Penghuni</DialogTitle>
            <DialogDescription>
              Silakan lengkapi atau ubah informasi penghuni di form berikut. Pastikan data yang dimasukkan benar sebelum menekan tombol "Simpan".
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Nama Lengkap <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="phone">Nomor Telepon <span className="text-red-500">*</span></Label>
              <Input
                id="phone"
                type="tel"
                value={nomorTelepon}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/\D/g, "");
                  setNomorTelepon(onlyNumbers);
                }}
              />

            </div>
            <div className="grid gap-3">
              <Label htmlFor="marital">Status Perkawinan <span className="text-red-500">*</span></Label>
              <Select value={statusPerkawinan} onValueChange={setStatusPerkawinan}>
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
            <div className="grid gap-3">
              <Label htmlFor="picture">Foto KTP</Label>
              <Input
                id="picture"
                type="file"
                onChange={(e) => setKtpFile(e.target.files[0])}
              />
              <p className="text-sm">Unggah file dengan ukuran maksimal 5MB</p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Kembali</Button>
            </DialogClose>
            {/* <DialogClose asChild> */}
            <Button onClick={handleEditData}>Simpan</Button>
            {/* </DialogClose> */}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default EditPenghuni;
