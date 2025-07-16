<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * @OA\Tag(
 *     name="Detail Penghuni Rumah",
 *     description="detail penghuni rumah"
 * )
 */
class DetailPenghuniRumahController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/detail-penghuni",
     *     tags={"Detail Penghuni Rumah"},
     *     summary="Menampilkan semua data detail penghuni rumah",
     *     @OA\Response(response=200, description="Berhasil mengambil data")
     * )
     */
    public function index()
    {
        $data = DB::table('detail_penghuni_rumah')
            ->whereNull('detail_penghuni_rumah.deleted_at')
            ->join('penghuni', 'penghuni.id', '=', 'detail_penghuni_rumah.id_penghuni')
            ->join('rumah', 'rumah.id', '=', 'detail_penghuni_rumah.id_rumah')
            ->select(
                'detail_penghuni_rumah.id',
                'rumah.nama_rumah',
                'rumah.no_rumah',
                'penghuni.nama_lengkap',
                'penghuni.nomor_telepon'
            )
            ->get();

        return response()->json([
            'message' => 'Data detail penghuni rumah berhasil diambil',
            'data' => $data
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/detail-penghuni",
     *     tags={"Detail Penghuni Rumah"},
     *     summary="Menambahkan data detail penghuni rumah",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"id_rumah", "id_penghuni"},
     *             @OA\Property(property="id_rumah", type="integer"),
     *             @OA\Property(property="id_penghuni", type="integer")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Berhasil ditambahkan"),
     *     @OA\Response(response=422, description="Validasi gagal")
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_rumah' => 'required|exists:rumah,id',
            'id_penghuni' => 'required|exists:penghuni,id'
        ]);

        $id = DB::table('detail_penghuni_rumah')->insertGetId([
            'id_rumah' => $request->id_rumah,
            'id_penghuni' => $request->id_penghuni,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $data = DB::table('detail_penghuni_rumah')->where('id', $id)->first();

        return response()->json([
            'message' => 'Data berhasil ditambahkan',
            'data' => $data
        ], 201);
    }

    /**
     * @OA\Delete(
     *     path="/api/detail-penghuni/{id}",
     *     tags={"Detail Penghuni Rumah"},
     *     summary="Menghapus data detail penghuni rumah",
     *     @OA\Parameter(
     *         name="id", in="path", required=true, @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Berhasil dihapus"),
     *     @OA\Response(response=404, description="Data tidak ditemukan")
     * )
     */
    public function destroy($id)
    {
        $data = DB::table('detail_penghuni_rumah')
            ->where('id', $id)
            ->whereNull('deleted_at')
            ->first();

        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        DB::table('detail_penghuni_rumah')
            ->where('id', $id)
            ->update(['deleted_at' => now()]);

        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
