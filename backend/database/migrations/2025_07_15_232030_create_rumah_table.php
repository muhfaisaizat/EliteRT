<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rumah', function (Blueprint $table) {
            $table->id();
            $table->string('nama_rumah');
            $table->string('no_rumah');
            $table->text('alamat_rumah');
            $table->enum('status_rumah', ['Tetap', 'Kontrak', 'Tidak dihuni']);
            $table->enum('kondisi_rumah', ['Dihuni', 'Tidak Dihuni']);
            $table->timestamps(); 
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rumah');
    }
};
