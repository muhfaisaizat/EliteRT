import React from 'react'
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
import { Textarea } from "@/components/ui/textarea"

const ViewPenghuni = ({ open, setOpen, data }) => {
  return (
     <Dialog open={open} onOpenChange={setOpen}>
          <form>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Detail Pengeluaran</DialogTitle>
                <DialogDescription>
                  Informasi berikut menampilkan detail lengkap Pengeluaran. Data ini bersifat hanya-baca dan tidak dapat diubah melalui tampilan ini.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name">Nama Pengeluaran</Label>
                  <Input  id="name" defaultValue={data?.["Nama Lengkap"] || ""}  readOnly/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="status">Kategori</Label>
                  <Input id="status" defaultValue={data?.["Status Penghuni"] || ""}  readOnly/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="phone">Jumlah pengeluaran</Label>
                  <Input id="phone" defaultValue={data?.["Nomor Telepon"] || ""}  readOnly/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="marital">Keterangan</Label>
                  <Textarea placeholder="Tulis disini...." readOnly/>
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
