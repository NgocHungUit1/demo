<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Manga;

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
}
