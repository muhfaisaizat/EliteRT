import React, { useState, useEffect } from 'react'
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
import axios from 'axios';
import { API_URL } from "../../../../helpers/networt";

const ViewPenghuni = ({ open, setOpen, data }) => {
  const [imageUrl, setImageUrl] = useState("https://dummyimage.com/720x400");

  useEffect(() => {
    const fetchImage = async () => {
      if (!data?.fotoKTP) return;

      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `${API_URL}/api/penghuni/ktp/${data.fotoKTP}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );

        const imageBlob = response.data;
        const imageObjectUrl = URL.createObjectURL(imageBlob);
        setImageUrl(imageObjectUrl);
      } catch (error) {
        console.error("Gagal mengambil gambar KTP:", error);
      }
    };

    fetchImage();
  }, [data]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detail Penghuni</DialogTitle>
            <DialogDescription>
              Informasi berikut menampilkan detail lengkap penghuni. Data ini bersifat hanya-baca dan tidak dapat diubah melalui tampilan ini.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <img
              src={imageUrl}
              alt="Foto KTP"
              className="h-[180px] w-auto border rounded object-contain mx-auto"
            />
            <div className="grid gap-3">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" defaultValue={data?.["Nama Lengkap"] || ""} readOnly />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="status">Status Penghuni</Label>
              <Input
                id="status"
                defaultValue={
                  data?.["Status Penghuni"] === "-" ? "Belum mendapatkan rumah" : data?.["Status Penghuni"] || ""
                }
                readOnly
              />

            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input id="phone" defaultValue={data?.["Nomor Telepon"] || ""} readOnly />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="marital">Status Perkawinan</Label>
              <Input id="marital" defaultValue={data?.["Status Perkawinan"] || ""} readOnly />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Kembali</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default ViewPenghuni
