<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            // Kiểm tra mật khẩu
            if (!Hash::check($request->input('password'), $user->password)) {
                return response()->json(['error' => 'Invalid credentials.'], 401);
            }

            $tokenResult = $user->createToken('Personal Access Token');
            $token = $tokenResult->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'expires_at' => $tokenResult->accessToken->expires_at,
            ]);
        }

        return response()->json(['error' => 'Unauthenticated.'], 401);
    }



    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();

        return response()->json(['message' => 'Logged out']);
    }

    public function dashboard(Request $request)
    {
        return response()->json(['message' => 'Succeses']);
    }
}
