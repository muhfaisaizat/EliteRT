<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * @OA\Tag(
 *     name="Pembayaran Iuran",
 *     description="pembayaran iuran"
 * )
 */
class PembayaranIuranController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/pembayaran-iuran",
     *     tags={"Pembayaran Iuran"},
     *     summary="Menampilkan semua data pembayaran iuran",
     *     @OA\Response(response=200, description="Berhasil mengambil data")
     * )
     */
    public function index()
    {
        $data = DB::table('pembayaran_iuran')
            ->whereNull('pembayaran_iuran.deleted_at')
            ->join('rumah', 'rumah.id', '=', 'pembayaran_iuran.id_rumah')
            ->join('penghuni', 'penghuni.id', '=', 'pembayaran_iuran.id_penghuni')
            ->select(
                'pembayaran_iuran.*',
                'rumah.nama_rumah',
                'rumah.no_rumah',
                'penghuni.nama_lengkap as nama_penghuni'
            )
            ->get();

        return response()->json([
            'message' => 'Data pembayaran iuran berhasil diambil',
            'data' => $data
        ]);
    }


    /**
     * @OA\Get(
     *     path="/api/pembayaran-iuran/rumah",
     *     tags={"Pembayaran Iuran"},
     *     summary="Menampilkan daftar rumah (ID dan nama)",
     *     @OA\Response(response=200, description="Berhasil mengambil data rumah")
     * )
     */
    public function getRumah()
    {
        $rumah = DB::table('rumah')
            ->select('id', 'nama_rumah')
            ->get();

        return response()->json([
            'message' => 'Data rumah berhasil diambil',
            'data' => $rumah
        ]);
    }


    /**
     * @OA\Get(
     *     path="/api/pembayaran-iuran/rumah/{id}",
     *     tags={"Pembayaran Iuran"},
     *     summary="Menampilkan penghuni aktif berdasarkan ID rumah",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID rumah",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Berhasil mengambil data penghuni"),
     *     @OA\Response(response=404, description="Data tidak ditemukan")
     * )
     */
    public function showById($id)
    {
        $penghuniAktif = DB::table('detail_penghuni_rumah as dpr')
            ->join('penghuni as p', 'dpr.id_penghuni', '=', 'p.id')
            ->select('p.id', 'p.nama_lengkap')
            ->where('dpr.id_rumah', $id)
            ->whereNull('dpr.deleted_at')
            ->get();

        // Cek jika kosong
        if ($penghuniAktif->isEmpty()) {
            return response()->json([
                'message' => 'Tidak ada penghuni aktif untuk rumah ini'
            ], 404);
        }

        // Return hanya data penghuni aktif
        return response()->json([
            'message' => 'Penghuni aktif berhasil diambil',
            'data' => $penghuniAktif
        ]);
    }




    /**
     * @OA\Post(
     *     path="/api/pembayaran-iuran",
     *     tags={"Pembayaran Iuran"},
     *     summary="Menambahkan data pembayaran iuran",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"id_rumah", "id_penghuni", "bulan", "tahun", "tagihan", "status_pembayaran"},
     *             @OA\Property(property="id_rumah", type="integer"),
     *             @OA\Property(property="id_penghuni", type="integer"),
     *             @OA\Property(property="bulan", type="string", example="Juli"),
     *             @OA\Property(property="tahun", type="integer", example=2025),
     *             @OA\Property(property="tagihan", type="number", format="float", example=50000.00),
     *             @OA\Property(property="status_pembayaran", type="string", enum={"belum bayar", "lunas"}),
     *             @OA\Property(property="metode_pembayaran", type="string", nullable=true),
     *             @OA\Property(property="keterangan", type="string", nullable=true)
     *         )
     *     ),
     *     @OA\Response(response=201, description="Data berhasil ditambahkan"),
     *     @OA\Response(response=422, description="Validasi gagal")
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_rumah' => 'required|exists:rumah,id',
            'id_penghuni' => 'required|exists:penghuni,id',
            'bulan' => 'required|string',
            'tahun' => 'required|digits:4|integer',
            'tagihan' => 'required|numeric',
            'status_pembayaran' => 'required|in:belum bayar,lunas',
            'metode_pembayaran' => 'nullable|string',
            'keterangan' => 'nullable|string',
        ]);

        $id = DB::table('pembayaran_iuran')->insertGetId([
            'id_rumah' => $request->id_rumah,
            'id_penghuni' => $request->id_penghuni,
            'bulan' => $request->bulan,
            'tahun' => $request->tahun,
            'tagihan' => $request->tagihan,
            'status_pembayaran' => $request->status_pembayaran,
            'metode_pembayaran' => $request->metode_pembayaran,
            'keterangan' => $request->keterangan,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $data = DB::table('pembayaran_iuran')->where('id', $id)->first();

        return response()->json([
            'message' => 'Data pembayaran iuran berhasil ditambahkan',
            'data' => $data
        ], 201);
    }


    /**
     * @OA\Put(
     *     path="/api/pembayaran-iuran/{id}",
     *     tags={"Pembayaran Iuran"},
     *     summary="Mengupdate data pembayaran iuran",
     *     @OA\Parameter(
     *         name="id", in="path", required=true, description="ID pembayaran iuran", @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"id_rumah", "id_penghuni", "bulan", "tahun", "tagihan", "status_pembayaran"},
     *             @OA\Property(property="id_rumah", type="integer"),
     *             @OA\Property(property="id_penghuni", type="integer"),
     *             @OA\Property(property="bulan", type="string", example="Juli"),
     *             @OA\Property(property="tahun", type="integer", example=2025),
     *             @OA\Property(property="tagihan", type="number", format="float", example=75000.00),
     *             @OA\Property(property="status_pembayaran", type="string", enum={"belum bayar", "lunas"}),
     *             @OA\Property(property="metode_pembayaran", type="string", nullable=true),
     *             @OA\Property(property="keterangan", type="string", nullable=true)
     *         )
     *     ),
     *     @OA\Response(response=200, description="Data berhasil diupdate"),
     *     @OA\Response(response=404, description="Data tidak ditemukan"),
     *     @OA\Response(response=422, description="Validasi gagal")
     * )
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'id_rumah' => 'required|exists:rumah,id',
            'id_penghuni' => 'required|exists:penghuni,id',
            'bulan' => 'required|string',
            'tahun' => 'required|digits:4|integer',
            'tagihan' => 'required|numeric',
            'status_pembayaran' => 'required|in:belum bayar,lunas',
            'metode_pembayaran' => 'nullable|string',
            'keterangan' => 'nullable|string',
        ]);

        $data = DB::table('pembayaran_iuran')
            ->where('id', $id)
            ->whereNull('deleted_at')
            ->first();

        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        DB::table('pembayaran_iuran')
            ->where('id', $id)
            ->update([
                'id_rumah' => $request->id_rumah,
                'id_penghuni' => $request->id_penghuni,
                'bulan' => $request->bulan,
                'tahun' => $request->tahun,
                'tagihan' => $request->tagihan,
                'status_pembayaran' => $request->status_pembayaran,
                'metode_pembayaran' => $request->metode_pembayaran,
                'keterangan' => $request->keterangan,
                'updated_at' => now(),
            ]);

        $updatedData = DB::table('pembayaran_iuran')->where('id', $id)->first();

        return response()->json([
            'message' => 'Data pembayaran iuran berhasil diupdate',
            'data' => $updatedData
        ]);
    }


    /**
     * @OA\Delete(
     *     path="/api/pembayaran-iuran/{id}",
     *     tags={"Pembayaran Iuran"},
     *     summary="Menghapus (soft delete) data pembayaran iuran",
     *     @OA\Parameter(
     *         name="id", in="path", required=true, @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Data berhasil dihapus"),
     *     @OA\Response(response=404, description="Data tidak ditemukan")
     * )
     */
    public function destroy($id)
    {
        $data = DB::table('pembayaran_iuran')
            ->where('id', $id)
            ->whereNull('deleted_at')
            ->first();

        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        DB::table('pembayaran_iuran')
            ->where('id', $id)
            ->update(['deleted_at' => now()]);

        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
