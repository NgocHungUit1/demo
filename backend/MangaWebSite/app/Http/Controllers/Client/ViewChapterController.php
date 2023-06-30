<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\Manga;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ViewChapterController extends Controller
{
    public function pageOfChapter($chapter_id)
    {
        $chapter = Chapter::findOrFail($chapter_id);
        //page là ảnh của một tập truyện cụ thể
        $pages = $chapter->pages;
        // Get the manga
        $mangaId = $chapter->manga_id;
        $manga = Manga::findOrFail($mangaId);

        // Get all chapters of the manga
        $allChapters = Chapter::where('manga_id', $mangaId)->get();

        // Get the next chapter
        $nextChapter = Chapter::where('manga_id', $chapter->manga_id)
            ->where('order', '>', $chapter->order)
            ->orderBy('order', 'asc')
            ->first();

        // Get the previous chapter
        $previousChapter = Chapter::where('manga_id', $chapter->manga_id)
            ->where('order', '<', $chapter->order)
            ->orderBy('order', 'desc')
            ->first();

        // Prepare the response data
        $responseData = [
            'manga_name' => $manga->name,
            'all_chapters' => $allChapters,
            'chapter' => $chapter,
            'pages' => $pages,
            'next_chapter' => $nextChapter,
            'previous_chapter' => $previousChapter,
        ];

        return response()->json(['data' => $responseData]);
    }
}
