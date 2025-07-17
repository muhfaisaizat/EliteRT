<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


/**
 * @OA\Tag(
 *     name="Dashboard",
 *     description="Dashboard"
 * )
 */
class DashboardController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/dashboard/card",
     *     summary="Ambil data dashboard (saldo, pengeluaran, metode pembayaran terbanyak, jumlah belum bayar)",
     *     tags={"Dashboard"},
     *     @OA\Parameter(
     *         name="periode",
     *         in="query",
     *         description="Periode data: bulan, tahun, semua",
     *         required=true,
     *         @OA\Schema(type="string", enum={"bulan", "tahun", "semua"})
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Berhasil mendapatkan data dashboard",
     *         @OA\JsonContent(
     *             @OA\Property(property="total_saldo", type="number"),
     *             @OA\Property(property="total_pengeluaran", type="number"),
     *             @OA\Property(property="metode_pembayaran", type="string"),
     *             @OA\Property(property="jumlah_metode", type="integer"),
     *             @OA\Property(property="jumlah_belum_bayar", type="integer")
     *         )
     *     )
     * )
     */
    public function card(Request $request)
    {
        $periode = $request->query('periode'); 

        
        $wherePembayaran = "1";
        $wherePengeluaran = "1";

        if ($periode === 'bulan') {
            $wherePembayaran = "MONTH(created_at) = MONTH(CURRENT_DATE) AND YEAR(created_at) = YEAR(CURRENT_DATE)";
            $wherePengeluaran = $wherePembayaran;
        } elseif ($periode === 'tahun') {
            $wherePembayaran = "YEAR(created_at) = YEAR(CURRENT_DATE)";
            $wherePengeluaran = $wherePembayaran;
        } elseif ($periode !== 'semua') {
            return response()->json(['message' => 'Periode tidak valid. Gunakan "bulan", "tahun", atau "semua".'], 400);
        }

        $sql = "
        SELECT 
            saldo.total_saldo,
            pengeluaran.total_pengeluaran,
            metode_terbanyak.metode_pembayaran,
            metode_terbanyak.jumlah AS jumlah_metode,
            belum_bayar.jumlah_belum_bayar
        FROM 
            (
                SELECT 
                    IFNULL(SUM(tagihan), 0) 
                    - IFNULL((
                        SELECT SUM(jumlah_pengeluaran) 
                        FROM pengeluaran 
                        WHERE $wherePengeluaran
                    ), 0) AS total_saldo
                FROM pembayaran_iuran
                WHERE status_pembayaran = 'lunas'
                AND $wherePembayaran
            ) AS saldo
        CROSS JOIN (
            SELECT 
                IFNULL(SUM(jumlah_pengeluaran), 0) AS total_pengeluaran 
            FROM pengeluaran
            WHERE $wherePengeluaran
        ) AS pengeluaran
        CROSS JOIN (
            SELECT 
                metode_pembayaran, 
                COUNT(*) AS jumlah 
            FROM pembayaran_iuran
            WHERE $wherePembayaran
            GROUP BY metode_pembayaran 
            ORDER BY jumlah DESC 
            LIMIT 1
        ) AS metode_terbanyak
        CROSS JOIN (
            SELECT 
                COUNT(*) AS jumlah_belum_bayar
            FROM pembayaran_iuran
            WHERE status_pembayaran != 'lunas'
            AND $wherePembayaran
        ) AS belum_bayar
        ";

        $result = DB::selectOne($sql);

        return response()->json([
            'total_saldo' => $result->total_saldo,
            'total_pengeluaran' => $result->total_pengeluaran,
            'metode_pembayaran' => $result->metode_pembayaran,
            'jumlah_metode' => $result->jumlah_metode,
            'jumlah_belum_bayar' => $result->jumlah_belum_bayar,
        ]);
    }


     /**
     * @OA\Get(
     *     path="/api/dashboard/chart",
     *     summary="Get daily pemasukan and pengeluaran for chart",
     *     tags={"Dashboard"},
     *     @OA\Response(
     *         response=200,
     *         description="Chart data returned successfully",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="tanggal", type="string", format="date", example="2024-04-01"),
     *                 @OA\Property(property="pemasukan", type="number", example=200000),
     *                 @OA\Property(property="pengeluaran", type="number", example=150000)
     *             )
     *         )
     *     )
     * )
     */
    public function chart()
    {
        $data = DB::select("
            SELECT 
              pemasukan_per_hari.tanggal,
              pemasukan_per_hari.pemasukan,
              IFNULL(pengeluaran_per_hari.pengeluaran, 0) AS pengeluaran
            FROM (
              SELECT 
                DATE(created_at) AS tanggal,
                SUM(tagihan) AS pemasukan
              FROM pembayaran_iuran
              WHERE status_pembayaran = 'lunas'
              GROUP BY DATE(created_at)
            ) AS pemasukan_per_hari
            LEFT JOIN (
              SELECT 
                DATE(created_at) AS tanggal,
                SUM(jumlah_pengeluaran) AS pengeluaran
              FROM pengeluaran
              GROUP BY DATE(created_at)
            ) AS pengeluaran_per_hari
            ON pemasukan_per_hari.tanggal = pengeluaran_per_hari.tanggal
            ORDER BY pemasukan_per_hari.tanggal ASC
            LIMIT 0, 25
        ");

        return response()->json($data);
    }
}
