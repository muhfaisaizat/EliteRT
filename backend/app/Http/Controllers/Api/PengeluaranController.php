<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * @OA\Tag(
 *     name="Pengeluaran",
 *     description="Manajemen data pengeluaran"
 * )
 */
class PengeluaranController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/pengeluaran",
     *     tags={"Pengeluaran"},
     *     summary="Menampilkan semua data pengeluaran",
     *     @OA\Response(response=200, description="Berhasil mengambil data pengeluaran")
     * )
     */
    public function index()
    {
        $data = DB::table('pengeluaran')
            ->whereNull('deleted_at')
            ->get();

        return response()->json([
            'message' => 'Data pengeluaran berhasil diambil',
            'data' => $data
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/pengeluaran/{id}",
     *     tags={"Pengeluaran"},
     *     summary="Menampilkan data pengeluaran berdasarkan ID",
     *     @OA\Parameter(
     *         name="id", in="path", required=true, @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Detail pengeluaran berhasil diambil"),
     *     @OA\Response(response=404, description="Pengeluaran tidak ditemukan")
     * )
     */
    public function show($id)
    {
        $data = DB::table('pengeluaran')
            ->where('id', $id)
            ->whereNull('deleted_at')
            ->first();

        if (!$data) {
            return response()->json(['message' => 'Pengeluaran tidak ditemukan'], 404);
        }

        return response()->json([
            'message' => 'Detail pengeluaran berhasil diambil',
            'data' => $data
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/pengeluaran",
     *     tags={"Pengeluaran"},
     *     summary="Menambahkan data pengeluaran baru",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nama_pengeluaran", "kategori", "jumlah_pengeluaran"},
     *             @OA\Property(property="nama_pengeluaran", type="string"),
     *             @OA\Property(property="kategori", type="string"),
     *             @OA\Property(property="jumlah_pengeluaran", type="number"),
     *             @OA\Property(property="keterangan", type="string", nullable=true)
     *         )
     *     ),
     *     @OA\Response(response=201, description="Pengeluaran berhasil ditambahkan"),
     *     @OA\Response(response=422, description="Validasi gagal")
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_pengeluaran' => 'required|string|max:255',
            'kategori' => 'required|string|max:100',
            'jumlah_pengeluaran' => 'required|numeric',
            'keterangan' => 'nullable|string',
        ]);

        $id = DB::table('pengeluaran')->insertGetId([
            'nama_pengeluaran' => $request->nama_pengeluaran,
            'kategori' => $request->kategori,
            'jumlah_pengeluaran' => $request->jumlah_pengeluaran,
            'keterangan' => $request->keterangan,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $data = DB::table('pengeluaran')->where('id', $id)->first();

        return response()->json([
            'message' => 'Pengeluaran berhasil ditambahkan',
            'data' => $data
        ], 201);
    }

    /**
     * @OA\Put(
     *     path="/api/pengeluaran/{id}",
     *     tags={"Pengeluaran"},
     *     summary="Mengupdate data pengeluaran",
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nama_pengeluaran", "kategori", "jumlah_pengeluaran"},
     *             @OA\Property(property="nama_pengeluaran", type="string"),
     *             @OA\Property(property="kategori", type="string"),
     *             @OA\Property(property="jumlah_pengeluaran", type="number"),
     *             @OA\Property(property="keterangan", type="string", nullable=true)
     *         )
     *     ),
     *     @OA\Response(response=200, description="Pengeluaran berhasil diperbarui"),
     *     @OA\Response(response=404, description="Pengeluaran tidak ditemukan")
     * )
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_pengeluaran' => 'required|string|max:255',
            'kategori' => 'required|string|max:100',
            'jumlah_pengeluaran' => 'required|numeric',
            'keterangan' => 'nullable|string',
        ]);

        $pengeluaran = DB::table('pengeluaran')
            ->where('id', $id)
            ->whereNull('deleted_at')
            ->first();

        if (!$pengeluaran) {
            return response()->json(['message' => 'Pengeluaran tidak ditemukan'], 404);
        }

        DB::table('pengeluaran')
            ->where('id', $id)
            ->update([
                'nama_pengeluaran' => $request->nama_pengeluaran,
                'kategori' => $request->kategori,
                'jumlah_pengeluaran' => $request->jumlah_pengeluaran,
                'keterangan' => $request->keterangan,
                'updated_at' => now()
            ]);

        $updated = DB::table('pengeluaran')->where('id', $id)->first();

        return response()->json([
            'message' => 'Pengeluaran berhasil diperbarui',
            'data' => $updated
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/api/pengeluaran/{id}",
     *     tags={"Pengeluaran"},
     *     summary="Soft delete data pengeluaran",
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Pengeluaran berhasil dihapus"),
     *     @OA\Response(response=404, description="Pengeluaran tidak ditemukan")
     * )
     */
    public function destroy($id)
    {
        $pengeluaran = DB::table('pengeluaran')
            ->where('id', $id)
            ->whereNull('deleted_at')
            ->first();

        if (!$pengeluaran) {
            return response()->json(['message' => 'Pengeluaran tidak ditemukan'], 404);
        }

        DB::table('pengeluaran')
            ->where('id', $id)
            ->update(['deleted_at' => now()]);

        return response()->json(['message' => 'Pengeluaran berhasil dihapus']);
    }
}
