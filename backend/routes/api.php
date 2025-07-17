<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

use App\Http\Controllers\Api\PenghuniController;
use App\Http\Controllers\Api\RumahController;
use App\Http\Controllers\Api\DetailPenghuniRumahController;
use App\Http\Controllers\Api\RiwayatPenghuniRumahController;
use App\Http\Controllers\Api\PembayaranIuranController;
use App\Http\Controllers\Api\PengeluaranController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\DashboardController;


Route::post('/login', [AuthController::class, 'login']);
Route::get('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::put('/reset-password', [AuthController::class, 'resetPassword']);

Route::middleware('auth:api')->group(function () {
    Route::prefix('penghuni')->group(function () {
        Route::get('/', [PenghuniController::class, 'index']);
        Route::get('/{id}', [PenghuniController::class, 'show']);
        Route::get('/ktp/{filename}', [PenghuniController::class, 'viewKtp']);
        Route::post('/', [PenghuniController::class, 'store']);
        Route::post('/update/{id}', [PenghuniController::class, 'update']);
        Route::delete('/{id}', [PenghuniController::class, 'destroy']);
    });

    Route::prefix('rumah')->group(function () {
        Route::get('/', [RumahController::class, 'index']);
        Route::get('/{id}', [RumahController::class, 'show']);
        Route::post('/', [RumahController::class, 'store']);
        Route::put('/{id}', [RumahController::class, 'update']);
        Route::delete('/{id}', [RumahController::class, 'destroy']);
    });


    Route::prefix('detail-penghuni')->group(function () {
        Route::get('/', [DetailPenghuniRumahController::class, 'index']);
        Route::post('/', [DetailPenghuniRumahController::class, 'store']);
        Route::delete('/{id}', [DetailPenghuniRumahController::class, 'destroy']);
    });


    Route::prefix('riwayat-penghuni')->group(function () {
        Route::put('{id}', [RiwayatPenghuniRumahController::class, 'update']);
        Route::delete('{id}', [RiwayatPenghuniRumahController::class, 'destroy']);
    });

    Route::prefix('pembayaran-iuran')->group(function () {
        Route::get('/', [PembayaranIuranController::class, 'index']);
        Route::get('/show-rumah/{id}', [PembayaranIuranController::class, 'showByIdRumah']);
        Route::get('/rumah', [PembayaranIuranController::class, 'getRumah']);
        Route::get('/rumah/{id}', [PembayaranIuranController::class, 'showById']);
        Route::post('/', [PembayaranIuranController::class, 'store']);
        Route::put('/{id}', [PembayaranIuranController::class, 'update']);
        Route::delete('/{id}', [PembayaranIuranController::class, 'destroy']);
    });


    Route::prefix('pengeluaran')->group(function () {
        Route::get('/', [PengeluaranController::class, 'index']);
        Route::post('/', [PengeluaranController::class, 'store']);
        Route::get('/{id}', [PengeluaranController::class, 'show']);
        Route::put('/{id}', [PengeluaranController::class, 'update']);
        Route::delete('/{id}', [PengeluaranController::class, 'destroy']);
    });

    Route::get('/dashboard/card', [DashboardController::class, 'card']);
    Route::get('/dashboard/chart', [DashboardController::class, 'chart']);
});
