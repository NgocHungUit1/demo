<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMangaRequest;
use App\Models\Genre;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\Manga;
use App\Services\MangaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Notifications\MangaApprovalNotification;

class MangaController extends Controller
{

    private $mangaService;

    public function __construct(MangaService $mangaService)
    {
        $this->mangaService = $mangaService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $params = $request->all();

        if (!empty($params)) {
            $mangas = Manga::searchManga($params);
        } else {
            $mangas = Manga::where('active', true)->with('chapters')->get();
        }

        foreach ($mangas as $manga) {
            $manga->unsetRelation('genres');
            $manga->genres_list = $manga->genres->pluck('name')->map(function ($genre) {
                return trim($genre);
            });
        }

        return response()->json(['data' => $mangas]);
    }


    public function comicCustomer(Request $request)
    {
        $params = $request->all();

        $query = Manga::with(['chapters', 'user'])
            ->whereHas('user', function ($query) {
                $query->where('role', 'customer');
            });

        if (!empty($params)) {
            $mangas = Manga::searchManga($query, $params);
        } else {
            $mangas = $query->get();
        }

        foreach ($mangas as $manga) {
            $manga->unsetRelation('genres');
            $manga->genres_list = $manga->genres->pluck('name')->map(function ($genre) {
                return trim($genre);
            });
        }

        return response()->json(['data' => $mangas]);
    }

    public function approveManga($id)
    {
        $manga = Manga::findOrFail($id);
        $manga->active = true;
        $manga->save();

        return response()->json(['message' => 'Truyện đã được duyệt']);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMangaRequest $request)
    {
        $data = $request->validated();
        $userCreated = Auth::user()->id;

        // Kiểm tra vai trò của người dùng
        $userRole = Auth::user()->role;

        if ($userRole === 'admin') {
            $data['active'] = true; // Người dùng admin có thể tạo truyện mà không cần duyệt
        } else {
            $data['active'] = false; // Người dùng customer tạo truyện sẽ chưa được kích hoạt
        }

        $manga = $this->mangaService->create($data, $userCreated);

        return response()->json(['data' => $manga]);
    }


    public function update(Request $request, $id)
    {
        $data = $request->all();

        $manga = Manga::findOrFail($id);
        $user = User::find($manga->user->id);
        // Log::info('test', ['manga' => $manga, 'id' => $id]);
        $user->notify(new MangaApprovalNotification($user, $manga));
        try {

            $manga = $this->mangaService->update($id, $data);

            return response()->json(['data' => $manga]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    private function saveImageAndGetFileName(Request $request, $mangaId)
    {
        $fileName = uniqid() . '.' . $request->file('image')->getClientOriginalExtension();
        $imagePath = "Manga/{$mangaId}/{$fileName}";
        Storage::disk('google')->put($imagePath, file_get_contents($request->file('image')));
        return $fileName;
    }

    private function syncGenres(Manga $manga, $genres)
    {
        if (!is_null($genres)) {
            $manga->genres()->sync($genres);
        } else {
            $manga->genres()->detach();
        }
    }

    // public function update(Request $request, $id)
    // {
    //     $data = $request->all();
    //     $manga = Manga::findOrFail($id);

    //     if ($request->hasFile('image')) {
    //         $fileName = $this->saveImageAndGetFileName($request, $manga->id);
    //         $data['image'] = "Manga/{$manga->id}/{$fileName}";
    //     }

    //     try {
    //         $manga->update($data);

    //         $this->syncGenres($manga, $request->input('genres'));

    //         $imageUrl = Storage::disk('google')->url($manga->image);

    //         return response()->json([
    //             'data' => [
    //                 'id' => $manga->id,
    //                 'name' => $manga->name,
    //                 'des' => $manga->des,
    //                 'author' => $manga->author,
    //                 'active' => $manga->active,
    //                 'complete' => $manga->complete,
    //                 'image' => $imageUrl,
    //                 'genres' => $manga->genres->pluck('name'),
    //             ]
    //         ]);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
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
        views($manga)->record();

        return response()->json([
            'data' => [
                'id' => $manga->id,
                'name' => $manga->name,
                'des' => $manga->des,
                'author' => $manga->author,
                'active' => $manga->active,
                'complete' => $manga->complete,
                'image' =>  $manga->image,
                'genres' => $manga->genres,
                'tag' => $manga->tag,
                'highlight' => $manga->highlight,
            ]
        ]);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $manga = Manga::findOrFail($id);
        $folderPath = "Manga/{$manga->slug}";

        // Delete image
        $fileName = basename($manga->image);
        Storage::disk('google')->delete("{$folderPath}/{$fileName}");

        // Delete manga folder
        if (Storage::disk('google')->exists($folderPath)) {
            Storage::disk('google')->deleteDirectory($folderPath);
        }

        // Detach genres
        $manga->genres()->detach();

        // Delete manga record
        $manga->delete();

        return response()->json(['status' => 'success', 'message' => 'Manga deleted successfully']);
    }


    public function tag($tag)
    {
        $tags = explode("-", $tag);
        $manga = Manga::where('tag', $tag)->get();
        return response()->json($manga);
    }
}
