<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::unprepared("
            CREATE TRIGGER after_softdelete_detail_penghuni
            AFTER UPDATE ON detail_penghuni_rumah
            FOR EACH ROW
            BEGIN
                IF NEW.deleted_at IS NOT NULL AND OLD.deleted_at IS NULL THEN
                    UPDATE riwayat_penghuni_rumah
                    SET tanggal_keluar = DATE_FORMAT(NEW.deleted_at, '%Y-%m-%d'),
                        updated_at = NOW()
                    WHERE id_rumah = NEW.id_rumah
                      AND id_penghuni = NEW.id_penghuni
                      AND tanggal_keluar = 'Masih Tinggal'
                      AND deleted_at IS NULL;
                END IF;
            END;
        ");
    }

    public function down(): void
    {
        DB::unprepared("DROP TRIGGER IF EXISTS after_softdelete_detail_penghuni;");
    }
};
