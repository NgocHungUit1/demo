<?php

namespace App\Http\Controllers;

use App\Models\Manga;

//
class AppController extends Controller
{
    // lấy manga nổi bật ,manga mới upload chapter mới nhất
    public function getMangaHome()
    {
        $getMangaPopular = Manga::getMangaPopular();
        $getMangaLastUpdate = Manga::latestUpdatedPaginate();
        return response()->json([
            'success' => true,
            'getMangaPopular' => $getMangaPopular,
            'getMangaLastUpdate' => $getMangaLastUpdate,
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
