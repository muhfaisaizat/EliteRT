# Aplikasi EliteRT



## Deskripsi  
Repositori ini adalah aplikasi berbasis web untuk sistem administrasi RT yang terdiri dari dua bagian utama:  
- **Backend**: Dibangun dengan Laravel versi 10, berfungsi sebagai API dan logika bisnis.  
- **Frontend**: Dibangun dengan ReactJS menggunakan Vite sebagai module bundler untuk antarmuka pengguna.

---

## Struktur Proyek
├── backend/ # Folder untuk backend Laravel
└── frontend/ # Folder untuk antarmuka frontend menggunakan Vite + React


---

## Prasyarat  
Pastikan kamu telah menginstal:
- [PHP 8.3+](https://www.php.net/) (Laravel 10 disarankan menggunakan PHP 8.3.23)
- [Composer](https://getcomposer.org/)
- [Node.js v20.12.2](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)

---

## Panduan Instalasi & Menjalankan Aplikasi  
> 🛠️ **Catatan**: Gunakan versi PHP 8.3.23 dan Jika kamu menggunakan **Laragon** sebagai local server, pastikan mengikuti langkah-langkah di bawah ini.

### 📁 Menaruh Folder Project di Laragon

1. Buka folder instalasi Laragon (biasanya: `C:\laragon`).
2. Masuk ke dalam folder `www`.
3. Pindahkan atau salin folder project kamu ke dalam folder `www`, misalnya:`C:\laragon\www\elitert`
4. Setelah itu, kamu bisa setup project
   
### 🔧 Backend (Laravel 10 + MySQL)

1. Masuk ke folder backend:
   ```bash
   cd backend
   
2. Install semua dependensi PHP:
   ```bash
   composer install
   
4. Salin file .env.example menjadi .env:
   ```bash
   cp .env.example .env
   
6. Atur konfigurasi database di file .env:
   ```bash
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=elitert
   DB_USERNAME=root
   DB_PASSWORD=  # sesuaikan dengan password MySQL kamu
   
8. Jalankan Laragon atau Mysql dan Buat database baru di phpMyAdmin atau MySQL dengan nama:
   ```bash
   elitert
   
10. Generate key aplikasi Laravel:
    ```bash
    php artisan key:generate
    
12. Jalankan migrasi database:
    ```bash
    php artisan migrate
    
14. Jalankan migrasi seeder:
    ```bash
    php artisan db:seed
    
16. Generate dokumentasi Swagger:
    ```bash
    php artisan l5-swagger:generate

18. Jalankan server Laravel:
    ```bash
    php artisan serve

20. Akses backend dan dokumentasi API melalui browser:
    ```bash
    http://127.0.0.1:8000/api/documentation


### 💻 Frontend (Vite + React)

1. Masuk ke folder frontend:
   ```bash
   cd frontend
   
3. Install semua dependensi:
   ```bash
   npm install
   # atau
   yarn install

5. Jalankan server development:
   ```bash
   npm run dev
   # atau
   yarn dev

7. Akses frontend di browser:
   ```bash
   http://localhost:5173

> ✅ Setelah kamu selesai melakukan setup **Backend** dan **Frontend**, jalankan aplikasi dengan urutan berikut:
> 1. Jalankan **backend** terlebih dahulu menggunakan `php artisan serve`.
> 2. Lalu jalankan **frontend** dengan `npm run dev` atau `yarn dev`.
> 
> Setiap kali ingin membuka aplikasi, pastikan backend berjalan terlebih dahulu, baru kemudian frontend-nya.

### 🔐 Akun Login Dummy
```bash
Email    : admin@gmail.com
Password : Admin123
