<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Manga;
use App\Models\Chapter;

//
class DetailsController extends Controller
{
    // lấy manga nổi bật ,manga mới upload chapter mới nhất
    public function mangaDetails($slug)
    {
        $manga = Manga::with('genres', 'chapters')->where('slug', $slug)->firstOrFail();
        $firstChapter = Chapter::orderBy('id', 'ASC')->where('manga_id', $manga->id)->first();
        $lastChapter = Chapter::orderBy('id', 'DESC')->where('manga_id', $manga->id)->first();
        views($manga)->record();

        return response()->json([
            'data' => [
                $manga
            ],
            'first_chapter' => $firstChapter,
            'last_chapter' => $lastChapter
        ]);
    }
}
