<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * @OA\Tag(
 *     name="Rumah",
 *     description=" rumah"
 * )
 */
class RumahController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/rumah",
     *     tags={"Rumah"},
     *     summary="Menampilkan semua data rumah",
     *     @OA\Response(response=200, description="Berhasil mengambil data rumah")
     * )
     */
    public function index()
    {
        $rumah = DB::table('rumah')
            ->whereNull('rumah.deleted_at')
            ->get()
            ->map(function ($r) {
                // Ambil penghuni aktif
                $penghuni = DB::table('detail_penghuni_rumah as dpr')
                    ->join('penghuni as p', 'dpr.id_penghuni', '=', 'p.id')
                    ->select('p.id', 'p.nama_lengkap', 'p.nomor_telepon', 'p.status_perkawinan', 'p.foto_ktp')
                    ->where('dpr.id_rumah', $r->id)
                    ->whereNull('dpr.deleted_at')
                    ->get();

                // Ambil riwayat penghuni
                $riwayat = DB::table('riwayat_penghuni_rumah as rpr')
                    ->join('penghuni as p', 'rpr.id_penghuni', '=', 'p.id')
                    ->select('rpr.id','p.nama_lengkap', 'rpr.tanggal_masuk', 'rpr.tanggal_keluar')
                    ->where('rpr.id_rumah', $r->id)
                    ->whereNull('rpr.deleted_at')
                    ->get();

                $r->penghuni_aktif = $penghuni;
                $r->riwayat_penghuni = $riwayat;
                return $r;
            });

        return response()->json([
            'message' => 'Data rumah beserta penghuni berhasil diambil',
            'data' => $rumah
        ]);
    }



    /**
     * @OA\Get(
     *     path="/api/rumah/{id}",
     *     tags={"Rumah"},
     *     summary="Menampilkan detail rumah berdasarkan ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Berhasil mengambil detail rumah"),
     *     @OA\Response(response=404, description="Rumah tidak ditemukan")
     * )
     */
    public function show($id)
    {
        $rumah = DB::table('rumah')->where('id', $id)->whereNull('deleted_at')->first();

        if (!$rumah) {
            return response()->json(['message' => 'Rumah tidak ditemukan'], 404);
        }

        return response()->json([
            'message' => 'Detail rumah berhasil diambil',
            'data' => $rumah
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/rumah",
     *     tags={"Rumah"},
     *     summary="Menambahkan rumah baru",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nama_rumah", "no_rumah", "alamat_rumah", "status_rumah"},
     *             @OA\Property(property="nama_rumah", type="string"),
     *             @OA\Property(property="no_rumah", type="string"),
     *             @OA\Property(property="alamat_rumah", type="string"),
     *             @OA\Property(property="status_rumah", type="string", enum={"Tetap", "Kontrak", "Tidak dihuni"}),
     *             @OA\Property(property="kondisi_rumah", type="string", enum={"Dihuni", "Tidak Dihuni"})
     *         )
     *     ),
     *     @OA\Response(response=201, description="Rumah berhasil ditambahkan"),
     *     @OA\Response(response=422, description="Validasi gagal")
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_rumah' => 'required|string|max:255',
            'no_rumah' => 'required|string|max:50',
            'alamat_rumah' => 'required|string',
            'status_rumah' => 'required|in:Tetap,Kontrak,Tidak dihuni',
            'kondisi_rumah' => 'required|in:Dihuni,Tidak Dihuni'
        ]);

        $id = DB::table('rumah')->insertGetId([
            'nama_rumah' => $request->nama_rumah,
            'no_rumah' => $request->no_rumah,
            'alamat_rumah' => $request->alamat_rumah,
            'status_rumah' => $request->status_rumah,
            'kondisi_rumah' => $request->kondisi_rumah,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $data = DB::table('rumah')->where('id', $id)->first();

        return response()->json([
            'message' => 'Rumah berhasil ditambahkan',
            'data' => $data
        ], 201);
    }

    /**
     * @OA\Put(
     *     path="/api/rumah/{id}",
     *     tags={"Rumah"},
     *     summary="Memperbarui data rumah",
     *     @OA\Parameter(
     *         name="id", in="path", required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nama_rumah", "no_rumah", "alamat_rumah", "status_rumah"},
     *             @OA\Property(property="nama_rumah", type="string"),
     *             @OA\Property(property="no_rumah", type="string"),
     *             @OA\Property(property="alamat_rumah", type="string"),
     *             @OA\Property(property="status_rumah", type="string", enum={"Tetap", "Kontrak", "Tidak dihuni"})
     *         )
     *     ),
     *     @OA\Response(response=200, description="Rumah berhasil diperbarui"),
     *     @OA\Response(response=404, description="Rumah tidak ditemukan")
     * )
     */
    public function update(Request $request, $id)
    {
        $rumah = DB::table('rumah')->where('id', $id)->whereNull('deleted_at')->first();

        if (!$rumah) {
            return response()->json(['message' => 'Rumah tidak ditemukan'], 404);
        }

        $request->validate([
            'nama_rumah' => 'required|string|max:255',
            'no_rumah' => 'required|string|max:50',
            'alamat_rumah' => 'required|string',
            'status_rumah' => 'required|in:Tetap,Kontrak,Tidak dihuni'
        ]);

        DB::table('rumah')->where('id', $id)->update([
            'nama_rumah' => $request->nama_rumah,
            'no_rumah' => $request->no_rumah,
            'alamat_rumah' => $request->alamat_rumah,
            'status_rumah' => $request->status_rumah,
            'updated_at' => now()
        ]);

        $data = DB::table('rumah')->where('id', $id)->first();

        return response()->json([
            'message' => 'Rumah berhasil diperbarui',
            'data' => $data
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/api/rumah/{id}",
     *     tags={"Rumah"},
     *     summary="Menghapus data rumah",
     *     @OA\Parameter(
     *         name="id", in="path", required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Rumah berhasil dihapus"),
     *     @OA\Response(response=404, description="Rumah tidak ditemukan")
     * )
     */
    public function destroy($id)
    {
        $rumah = DB::table('rumah')->where('id', $id)->whereNull('deleted_at')->first();

        if (!$rumah) {
            return response()->json(['message' => 'Rumah tidak ditemukan'], 404);
        }

        DB::table('rumah')->where('id', $id)->update([
            'deleted_at' => now()
        ]);

        return response()->json(['message' => 'Rumah berhasil dihapus']);
    }
}
