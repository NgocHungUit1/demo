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
            'last_chapter' => $lastChapter
        ]);
    }

    public function favouriteMangas(Request $request, $id)
    {
        $type = $request->type;
        if ($type == 'up') {
            Auth::user()->favouriteMangas()->attach([$id]);
        } else {
            Auth::user()->favouriteMangas()->detach([$id]);
        }
        return response()->json([
            'status' => true,
        ]);
    }
}
