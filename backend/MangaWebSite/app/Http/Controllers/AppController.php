<?php

namespace App\Http\Controllers;

use App\Models\Manga;
use Illuminate\Http\Request;

//
class AppController extends Controller
{
    // lấy manga nổi bật ,manga mới upload chapter mới nhất
    public function getMangaHome(Request $request)
    {
        // Nếu có từ khóa được nhập vào trong thanh tìm kiếm
        if ($request->has('keyword')) {
            $keyword = $request->input('keyword');
            $results = Manga::searchMangaKeyword($keyword);

            return response()->json([
                'success' => true,
                'results' => $results,
            ]);
        }
        return response()->json([
            'success' => true,
            'getTopLikes'=> Manga::orderBy('like', 'desc')->take(10)->get(),
            'getMangaNew' => Manga::getMangaNewest(),
            'getMangaPopular' => Manga::getMangaPopular(),
            'getMangaLastUpdate' => Manga::latestUpdatedPaginate()
        ]);
    }


    // lấy manga theo lượt views,tổng,ngày,tháng
    public function getMangaViews()
    {
        return response()->json([
            'success' => true,
            'getMostViewedMangas' =>  Manga::getMostViewedMangas(),
            'getMostViewedMangasThisDay' => Manga::getMostViewedMangasThisDay(),
            'getMostViewedMangasThisWeek' => Manga::getMostViewedMangasThisWeek(),
            'getMostViewedMangasThisMonth' => Manga::getMostViewedMangasThisMonth(),
        ]);
    }
}
