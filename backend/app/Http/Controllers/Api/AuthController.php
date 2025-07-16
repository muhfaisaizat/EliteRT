<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Support\Facades\DB;

/**
 * @OA\Tag(
 *     name="Auth",
 *     description="Authentication Endpoints"
 * )
 */
class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/login",
     *     tags={"Auth"},
     *     summary="Login User",
     *     description="Login user menggunakan email dan password",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(property="email", type="string", format="email", example="admin@gmail.com"),
     *             @OA\Property(property="password", type="string", format="password", example="Admin123")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Login berhasil"),
     *     @OA\Response(response=401, description="Unauthorized")
     * )
     */
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Berarti password cocok, bisa login manual
        $token = Auth::login($user);

        return $this->respondWithToken($token);
    }

    /**
     * @OA\Get(
     *     path="/api/forgot-password",
     *     tags={"Auth"},
     *     summary="Cek email untuk reset password",
     *     description="Cek apakah email terdaftar. Jika ya, kirim pesan verifikasi.",
     *     @OA\Parameter(
     *         name="email",
     *         in="query",
     *         required=true,
     *         @OA\Schema(type="string", format="email"),
     *         description="Email user"
     *     ),
     *     @OA\Response(response=200, description="Email terverifikasi"),
     *     @OA\Response(response=404, description="Email tidak ditemukan")
     * )
     */
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->query('email'))->first();

        if (!$user) {
            return response()->json(['message' => 'Email tidak ditemukan'], 404);
        }

        return response()->json(['message' => 'Email terverifikasi'], 200);
    }


    /**
     * @OA\Put(
     *     path="/api/reset-password",
     *     tags={"Auth"},
     *     summary="Reset password tanpa token",
     *     description="Reset password hanya dengan email dan konfirmasi password (tanpa perlu token)",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "password", "password_confirmation"},
     *             @OA\Property(property="email", type="string", example="admin@gmail.com"),
     *             @OA\Property(property="password", type="string", example="PasswordBaru123"),
     *             @OA\Property(property="password_confirmation", type="string", example="PasswordBaru123")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Password berhasil direset"),
     *     @OA\Response(response=404, description="Email tidak ditemukan")
     * )
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Email tidak ditemukan'], 404);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message' => 'Password berhasil direset']);
    }


    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => 60 * 60
        ]);
    }
}
