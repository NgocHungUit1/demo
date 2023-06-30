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
            'chapter' => $chapter,
            'pages' => $chapter->pages,
            'next_chapter' => $nextChapter,
            'previous_chapter' => $previousChapter,
        ];

        unset($responseData['pages']); // Remove the duplicate "pages" key

        return response()->json(['data' => $responseData]);
    }
}
