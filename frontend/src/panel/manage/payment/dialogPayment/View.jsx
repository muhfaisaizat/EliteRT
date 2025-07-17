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
                <DialogTitle>Detail Pembayaran Iuran</DialogTitle>
                <DialogDescription>
                  Informasi berikut menampilkan detail lengkap Pembayaran Iuran. Data ini bersifat hanya-baca dan tidak dapat diubah melalui tampilan ini.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name">Nama Rumah</Label>
                  <Input  id="name" defaultValue={data?.["nama_rumah"] || ""}  readOnly/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="status">Nama Pembayar</Label>
                  <Input id="status" defaultValue={data?.["nama_penghuni"] || ""}  readOnly/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="phone">Bulan</Label>
                  <Input id="phone" defaultValue={data?.["bulan"] || ""}  readOnly/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="marital">Tahun</Label>
                  <Input id="marital" defaultValue={data?.["tahun"] || ""}  readOnly/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="marital">Jenis Iuran</Label>
                  <Input id="marital" defaultValue={data?.["jenis_iuran"] || ""}  readOnly/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="marital">Tagihan</Label>
                  <Input id="marital" defaultValue={data?.["tagihan"] || ""}  readOnly/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="marital">Status Pembayaran</Label>
                  <Input id="marital" defaultValue={data?.["status_pembayaran"] || ""}  readOnly/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="marital">Metode Pembayaran</Label>
                  <Input id="marital" defaultValue={data?.["metode_pembayaran"] || ""}  readOnly/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="marital">Keterangan</Label>
                  <Textarea defaultValue={data?.["keterangan"] || "-"} readOnly/>
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
