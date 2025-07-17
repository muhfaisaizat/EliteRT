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
         Schema::create('pembayaran_iuran', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_rumah');
            $table->unsignedBigInteger('id_penghuni');
            $table->string('bulan', 20); 
            $table->year('tahun');
            $table->string('jenis_iuran'); 
            $table->float('tagihan'); 
            $table->enum('status_pembayaran', ['belum bayar', 'lunas'])->default('belum bayar');
            $table->string('metode_pembayaran')->nullable(); 
            $table->text('keterangan')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        
        Schema::table('pembayaran_iuran', function (Blueprint $table) {
            $table->foreign('id_rumah')->references('id')->on('rumah')->onDelete('cascade');
            $table->foreign('id_penghuni')->references('id')->on('penghuni')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayaran_iuran');
    }
};
