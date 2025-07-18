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
- [PHP 8.3+](https://www.php.net/) (Laravel 10 membutuhkan PHP 8.3.10)
- [Composer](https://getcomposer.org/)
- [Node.js v20.12.2](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)

---

## Panduan Instalasi & Menjalankan Aplikasi  

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
   
8. Buat database baru di phpMyAdmin atau MySQL dengan nama:
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


### 🔐 Akun Login Dummy
```bash
Email    : admin@gmail.com
Password : Admin123
