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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";
import { RiCloseFill } from "react-icons/ri";


const people = [
  { id: "1", name: "Tidak Dihuni" },
  { id: "2", name: "Rina Ayu" },
  { id: "3", name: "Budi Santoso" },
  { id: "4", name: "Siti Nurhaliza" },
  { id: "5", name: "Agus Wijaya" },
  { id: "6", name: "Dewi Lestari" },
]

const TambahHome = () => {
  const { toast } = useToast();
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showActivityBar, setShowActivityBar] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

  const [selectedIds, setSelectedIds] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleRemove = (id) => {
    setSelectedIds((prev) => prev.filter((item) => item !== id))
  }

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedPeople = people.filter((person) =>
    selectedIds.includes(person.id)
  )


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
            <DialogTitle>Tambah Rumah</DialogTitle>
            <DialogDescription>
              Lengkapi informasi rumah dengan benar pada form di bawah ini. Tekan tombol "Simpan" untuk menyimpan data.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nama">Nama Rumah <span className="text-red-500">*</span></Label>
              <Input id="nama" value={formData.nama} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nama">No Rumah <span className="text-red-500">*</span></Label>
              <Input id="nama" value={formData.nama} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nama">Alamat Rumah <span className="text-red-500">*</span></Label>
              <Input id="nama" value={formData.nama} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nama">Status Rumah <span className="text-red-500">*</span></Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="tetap">tetap</SelectItem>
                    <SelectItem value="kontrak">kontrak</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nama">Pilih Penghuni <span className="text-red-500">*</span></Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex justify-start w-full">
                    Pilih
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <Input
                    placeholder="Cari nama..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="m-2 w-auto"
                  />
                  <DropdownMenuSeparator />
                  {filteredPeople.map((person) => (
                    <DropdownMenuCheckboxItem
                      key={person.id}
                      checked={selectedIds.includes(person.id)}
                      onCheckedChange={() => handleToggle(person.id)}
                    >
                      {person.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>


              <div className="flex gap-2 flex-wrap">
                {selectedPeople.map((person) => (
                  <Badge key={person.id} className="flex items-center gap-1 pr-1">
                    {person.name}
                    <RiCloseFill
                      size={18}
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => handleRemove(person.id)}
                    />
                  </Badge>
                ))}
              </div>
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
  )
}

export default TambahHome

