<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PenghuniController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/penghuni",
     *     summary="Menampilkan semua data penghuni",
     *     tags={"Penghuni"},
     *     @OA\Response(
     *         response=200,
     *         description="Data penghuni berhasil diambil"
     *     )
     * )
     */
    public function index()
    {
        $penghuni = DB::table('penghuni')
            ->leftJoin('detail_penghuni_rumah', 'penghuni.id', '=', 'detail_penghuni_rumah.id_penghuni')
            ->leftJoin('rumah', 'detail_penghuni_rumah.id_rumah', '=', 'rumah.id')
            ->select(
                'penghuni.id',
                'penghuni.nama_lengkap',
                'penghuni.nomor_telepon',
                'penghuni.status_perkawinan',
                'penghuni.foto_ktp',
                DB::raw("COALESCE(rumah.status_rumah, '-') as status_tempat_tinggal"),
                DB::raw("COALESCE(rumah.nama_rumah, '-') as nama_rumah"),
                DB::raw("COALESCE(rumah.no_rumah, '-') as no_rumah")
            )
            ->whereNull('penghuni.deleted_at')
            ->get();

        return response()->json([
            'message' => 'Berhasil mengambil data penghuni',
            'data' => $penghuni
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/penghuni/{id}",
     *     summary="Tampilkan detail penghuni",
     *     tags={"Penghuni"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Berhasil"),
     *     @OA\Response(response=404, description="Data tidak ditemukan")
     * )
     */
    public function show($id)
    {
        $penghuni = DB::table('penghuni')->where('id', $id)->whereNull('deleted_at')->first();

        if (!$penghuni) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        return response()->json([
            'message' => 'Berhasil mengambil data penghuni',
            'data' => $penghuni
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/penghuni",
     *     summary="Tambah penghuni baru",
     *     tags={"Penghuni"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"nama_lengkap", "nomor_telepon", "status_perkawinan", "foto_ktp"},
     *                 @OA\Property(property="nama_lengkap", type="string"),
     *                 @OA\Property(property="nomor_telepon", type="string"),
     *                 @OA\Property(property="status_perkawinan", type="string"),
     *                 @OA\Property(property="foto_ktp", type="file", format="binary")
     *             )
     *         )
     *     ),
     *     @OA\Response(response=201, description="Berhasil menambahkan data"),
     *     @OA\Response(response=400, description="Gagal")
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nomor_telepon' => 'required|string|max:20',
            'status_perkawinan' => 'required|string|max:50',
            'foto_ktp' => 'required|file|image|mimes:jpeg,png,jpg|max:5120', // max 5MB
        ]);

        // Simpan foto ke folder public/uploads/ktp dan rename
        if ($request->hasFile('foto_ktp')) {
            $file = $request->file('foto_ktp');
            $filename = 'ktp_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/ktp'), $filename);
        } else {
            return response()->json(['message' => 'Upload foto KTP gagal'], 400);
        }

        // Simpan ke database
        $id = DB::table('penghuni')->insertGetId([
            'nama_lengkap' => $request->nama_lengkap,
            'nomor_telepon' => $request->nomor_telepon,
            'status_perkawinan' => $request->status_perkawinan,
            'foto_ktp' => $filename,
            'created_at' => now(),
        ]);

        $penghuni = DB::table('penghuni')->where('id', $id)->first();

        return response()->json([
            'message' => 'Data penghuni berhasil ditambahkan',
            'data' => $penghuni
        ], 201);
    }


    /**
     * @OA\Post(
     *     path="/api/penghuni/update/{id}",
     *     summary="Update data penghuni",
     *     tags={"Penghuni"},
     *     @OA\Parameter(
     *         name="id", in="path", required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(property="nama_lengkap", type="string"),
     *                 @OA\Property(property="nomor_telepon", type="string"),
     *                 @OA\Property(property="status_perkawinan", type="string"),
     *                 @OA\Property(property="foto_ktp", type="file", format="binary")
     *             )
     *         )
     *     ),
     *     @OA\Response(response=200, description="Berhasil diupdate"),
     *     @OA\Response(response=404, description="Data tidak ditemukan")
     * )
     */
    public function update(Request $request, $id)
    {
        $penghuni = DB::table('penghuni')->where('id', $id)->whereNull('deleted_at')->first();

        if (!$penghuni) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $request->validate([
            'nama_lengkap' => 'required|string',
            'nomor_telepon' => 'required|string',
            'status_perkawinan' => 'required|string',
            'foto_ktp' => 'nullable|image|max:5120',
        ]);

        $data = [
            'nama_lengkap' => $request->nama_lengkap,
            'nomor_telepon' => $request->nomor_telepon,
            'status_perkawinan' => $request->status_perkawinan,
            'updated_at' => now(),
        ];


        if ($request->hasFile('foto_ktp')) {
            $request->validate([
                'foto_ktp' => 'file|image|mimes:jpeg,png,jpg|max:5120',
            ]);


            $oldFile = public_path('uploads/ktp/' . $penghuni->foto_ktp);
            if (file_exists($oldFile)) {
                unlink($oldFile);
            }


            $file = $request->file('foto_ktp');
            $newFilename = 'ktp_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/ktp'), $newFilename);


            $data['foto_ktp'] = $newFilename;
        }

        DB::table('penghuni')->where('id', $id)->update($data);

        $updated = DB::table('penghuni')->where('id', $id)->first();

        return response()->json([
            'message' => 'Data penghuni berhasil diupdate',
            'data' => $updated
        ]);
    }


    /**
     * @OA\Delete(
     *     path="/api/penghuni/{id}",
     *     summary="Soft delete data penghuni",
     *     tags={"Penghuni"},
     *     @OA\Parameter(
     *         name="id", in="path", required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Berhasil dihapus"),
     *     @OA\Response(response=404, description="Data tidak ditemukan")
     * )
     */
    public function destroy($id)
    {
        $exists = DB::table('penghuni')->where('id', $id)->whereNull('deleted_at')->exists();

        if (!$exists) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        DB::table('penghuni')->where('id', $id)->update([
            'deleted_at' => now()
        ]);

        return response()->json(['message' => 'Data penghuni berhasil dihapus']);
    }



    public function viewKtp($filename)
    {
        $path = public_path('uploads/ktp/' . $filename);

        if (!file_exists($path)) {
            return response()->json(['message' => 'File tidak ditemukan'], 404);
        }

        return response()->file($path);
    }
}
