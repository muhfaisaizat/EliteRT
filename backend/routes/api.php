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

Route::prefix('penghuni')->group(function () {
    Route::get('/', [PenghuniController::class, 'index']);
    Route::get('/{id}', [PenghuniController::class, 'show']);
    Route::get('/ktp/{filename}', [PenghuniController::class, 'viewKtp']);
    Route::post('/', [PenghuniController::class, 'store']);
    Route::post('/update/{id}', [PenghuniController::class, 'update']);
    Route::delete('/{id}', [PenghuniController::class, 'destroy']);
});
