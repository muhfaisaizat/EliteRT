<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::unprepared("
            CREATE TRIGGER after_insert_detail_penghuni_to_riwayat
            AFTER INSERT ON detail_penghuni_rumah
            FOR EACH ROW
            BEGIN
                INSERT INTO riwayat_penghuni_rumah (
                    id_rumah,
                    id_penghuni,
                    tanggal_masuk,
                    tanggal_keluar,
                    created_at,
                    updated_at
                ) VALUES (
                    NEW.id_rumah,
                    NEW.id_penghuni,
                    DATE_FORMAT(NOW(), '%Y-%m-%d'),
                    'Masih Tinggal',
                    NOW(),
                    NOW()
                );
            END;
        ");
    }

    public function down(): void
    {
        DB::unprepared("DROP TRIGGER IF EXISTS after_insert_detail_penghuni_to_riwayat;");
    }
};
