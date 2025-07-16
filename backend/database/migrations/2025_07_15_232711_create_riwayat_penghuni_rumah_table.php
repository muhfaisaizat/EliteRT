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
         Schema::create('riwayat_penghuni_rumah', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_rumah');
            $table->unsignedBigInteger('id_penghuni');
            $table->string('tanggal_masuk');
            $table->string('tanggal_keluar')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Foreign keys
            $table->foreign('id_rumah')->references('id')->on('rumah')->onDelete('cascade');
            $table->foreign('id_penghuni')->references('id')->on('penghuni')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_penghuni_rumah');
    }
};
