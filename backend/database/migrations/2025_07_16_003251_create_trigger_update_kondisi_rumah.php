<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Trigger setelah insert ke detail_penghuni_rumah
        DB::unprepared("
            CREATE TRIGGER after_insert_detail_penghuni
            AFTER INSERT ON detail_penghuni_rumah
            FOR EACH ROW
            BEGIN
                UPDATE rumah
                SET kondisi_rumah = 'Dihuni'
                WHERE id = NEW.id_rumah;
            END;
        ");

        // Trigger setelah update (misal soft delete)
        DB::unprepared("
            CREATE TRIGGER after_update_detail_penghuni
            AFTER UPDATE ON detail_penghuni_rumah
            FOR EACH ROW
            BEGIN
                IF NEW.deleted_at IS NOT NULL THEN
                    IF (SELECT COUNT(*) FROM detail_penghuni_rumah WHERE id_rumah = OLD.id_rumah AND deleted_at IS NULL) = 0 THEN
                        UPDATE rumah
                        SET kondisi_rumah = 'Tidak Dihuni'
                        WHERE id = OLD.id_rumah;
                    END IF;
                END IF;
            END;
        ");
    }

    public function down(): void
    {
        DB::unprepared("DROP TRIGGER IF EXISTS after_insert_detail_penghuni;");
        DB::unprepared("DROP TRIGGER IF EXISTS after_update_detail_penghuni;");
    }
};
