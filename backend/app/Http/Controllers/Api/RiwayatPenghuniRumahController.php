<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * @OA\Tag(
 *     name="Riwayat Penghuni Rumah",
 *     description="riwayat penghuni rumah"
 * )
 */
class RiwayatPenghuniRumahController extends Controller
{
     /**
     * @OA\Put(
     *     path="/api/riwayat-penghuni/{id}",
     *     tags={"Riwayat Penghuni Rumah"},
     *     summary="Update data riwayat penghuni rumah",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID riwayat penghuni",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"tanggal_keluar"},
     *             @OA\Property(property="tanggal_keluar", type="string", format="date", example="2025-07-15")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Berhasil mengupdate data"),
     *     @OA\Response(response=404, description="Data tidak ditemukan")
     * )
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'tanggal_keluar' => 'required|date',
        ]);

        $data = DB::table('riwayat_penghuni_rumah')
            ->where('id', $id)
            ->whereNull('deleted_at')
            ->first();

        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        DB::table('riwayat_penghuni_rumah')
            ->where('id', $id)
            ->update([
                'tanggal_keluar' => $request->tanggal_keluar,
                'updated_at' => now(),
            ]);

        return response()->json(['message' => 'Data berhasil diupdate']);
    }


    /**
     * @OA\Delete(
     *     path="/api/riwayat-penghuni/{id}",
     *     tags={"Riwayat Penghuni Rumah"},
     *     summary="Menghapus (soft delete) data riwayat penghuni rumah",
     *     @OA\Parameter(
     *         name="id", in="path", required=true, @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Berhasil dihapus"),
     *     @OA\Response(response=404, description="Data tidak ditemukan")
     * )
     */
    public function destroy($id)
    {
        $data = DB::table('riwayat_penghuni_rumah')
            ->where('id', $id)
            ->whereNull('deleted_at')
            ->first();

        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        DB::table('riwayat_penghuni_rumah')
            ->where('id', $id)
            ->update(['deleted_at' => now()]);

        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
