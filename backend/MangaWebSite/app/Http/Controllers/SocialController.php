<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    public function loginGoogleUrl()
    {
        return response()->json([
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
        ]);
    }

    public function loginGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();
        $user = User::where('google_id', $googleUser->id)->first();

        if ($user) {
            Auth::login($user);
        } else {
            $user = User::create([
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'google_id' => $googleUser->id,
                'password' => Hash::make('123123'),
                'image' => $googleUser->avatar
            ]);
            Auth::login($user);
        }
        $user->visit()->hourlyIntervals()->withIp();
        return response()->json([
            'status' => true,
            'access_token' => $user->createToken('google-token')->plainTextToken,
            'token_type' => 'Bearer',
            'user' => $user // trả về thông tin user dưới dạng json
        ]);
    }

    public function user()
    {
        return response()->json([
            'status' => true,
            'users' => User::popularAllTime()->get(),
        ]);
    }
}
