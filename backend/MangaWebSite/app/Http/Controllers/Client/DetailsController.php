<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Manga;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class DetailsController extends Controller
{
    public function mangaDetails($slug)
    {
        $manga = Manga::getMangaDetails($slug);
        $chapterInfo = $manga->getFirstAndLastChapter();
        $firstChapter = $chapterInfo['firstChapter'];
        $lastChapter = $chapterInfo['lastChapter'];
        views($manga)->record();

        return response()->json([
            'manga' =>       $manga,
            'first_chapter' => $firstChapter,
            'last_chapter' => $lastChapter,
        ]);
    }

//Nếu user đã like rồi thì trả về 1, chưa like thì trả về 0
    public function likes(Request $request, $manga_id)
    {
        $manga = Manga::findOrFail($manga_id);
        $isLiked=$manga->favouriteUsers()->where('id', Auth::user()->id)->count() >= 1 ? 1 : 0;
        return response()->json(['mangas' => $isLiked], 200);
    }

// User kick vào button 'up' thì like mà ngược lại thì unlike,còn lại trông chờ vào m,có gì khó hiểu hỏi tao
    public function favouriteMangas(Request $request, $id)
    {
        $type = $request->type;
        if ($type == 'up') {
            Auth::user()->favouriteMangas()->attach([$id]);
            $manga = Manga::find($id);
            $manga->like += 1;
            $manga->save();
        } else {
            Auth::user()->favouriteMangas()->attach([$id]);
            $manga = Manga::find($id);
            $manga->like -= 1;
            $manga->save();
        }
        return response()->json([
            'status' => true,
        ]);
    }
    public function commentDetails($idManga)
    {
        $manga = Manga::findOrFail($idManga);
        $comments = $manga->comments()->with(['user', 'replies.user'])->orderBy('created_at', 'desc')->get();
        return response()->json([
            'comments' => $comments,
        ]);
    }




}
