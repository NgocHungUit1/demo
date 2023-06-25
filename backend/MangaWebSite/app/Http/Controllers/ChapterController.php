<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMangaRequest;
use App\Models\Chapter;
use App\Models\Genre;
use App\Models\Manga;
use App\Services\ChapterService;
use App\Services\MangaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class ChapterController extends Controller
{

    private $chapterService;

    public function __construct(ChapterService $chapterService)
    {
        $this->chapterService = $chapterService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        $chapter = $this->chapterService->storeChapter($id, $request->all());

        return response()->json([
            'message' => 'Chapter created successfully',
            'data' => $chapter,
            'previous_url' => url()->previous()
        ]);
    }

    // private function saveImageAndGetFileName($image, $mangaId, $slugChapter)
    // {
    //     $fileName = uniqid() . '.' . $image->getClientOriginalExtension();
    //     $folderPath = "Manga/{$mangaId}/{$slugChapter}";
    //     if (!Storage::disk('google')->exists($folderPath)) {
    //         Storage::disk('google')->makeDirectory($folderPath);
    //     }
    //     Storage::disk('google')->put("{$folderPath}/{$fileName}", file_get_contents($image));
    //     return $fileName;
    // }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $manga = Manga::findOrFail($id);
        $chapters = $manga->chapters;

        return response()->json(['data' => $chapters]);
    }

    public function pageOfChapter($id)
    {
        $chapter = Chapter::findOrFail($id)->pages;

        return response()->json(['data' => $chapter]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateImages(Request $request, $chapterId)
    {
        $chapter = $this->chapterService->updateChapterImages($chapterId, $request->all());
        return response()->json(['chapter' => $chapter]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $chapter = Chapter::findOrFail($id);
        $path = "Manga/{$chapter->manga->slug}/{$chapter->slug_chapter}";
        Storage::disk('google')->deleteDirectory($path);
        $chapter->pages()->delete(); // Xóa các trang liên quan trong bảng pages
        $chapter->delete(); // Xóa chapter

        return response()->json(['message' => 'Chapter deleted successfully'], 200);
    }
}
