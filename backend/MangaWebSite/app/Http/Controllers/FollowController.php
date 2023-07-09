<?php

namespace App\Http\Controllers;

use App\Models\Follow_Status;
use App\Models\Manga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    public function follow(Request $request, $manga_id)
    {
        $followStatus = Follow_Status::where('manga_id', $manga_id)
            ->where('user_id', Auth::id())
            ->first();

        if ($followStatus) {
            $followStatus->status = $request->status;
            $followStatus->save();
        } else {
            $followStatus = Follow_Status::create([
                'manga_id' => $request->manga_id,
                'user_id' => Auth::id(),
                'status' => $request->status
            ]);
        }
        return response()->json(['message' => 'Trạng thái đã được lưu.'], 200);
    }

    public function getByStatus()
    {
        $status = request()->input('status');
        $user_id = Auth::id();

        $mangas = Manga::whereHas('followStatus', function ($query) use ($status, $user_id) {
            $query->where('status', $status)
                ->where('user_id', $user_id);
        })->get();

        return response()->json(['mangas' => $mangas], 200);
    }
}
