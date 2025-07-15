import React from 'react';
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

const EditPenghuni = ({ open, setOpen, data }) => {
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
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" defaultValue={data?.["Nama Lengkap"] || ""} />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input id="phone" defaultValue={data?.["Nomor Telepon"] || ""} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="marital">Status Perkawinan</Label>
              <Input id="marital" defaultValue={data?.["Status Perkawinan"] || ""} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="picture">Foto KTP</Label>
              <Input id="picture" type="file" />
              <p className="text-sm">Unggah file dengan ukuran maksimal 5MB</p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Kembali</Button>
            </DialogClose>
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default EditPenghuni;
