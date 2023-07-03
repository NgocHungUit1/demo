<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use CyrildeWit\EloquentViewable\InteractsWithViews;
use CyrildeWit\EloquentViewable\Contracts\Viewable;
use CyrildeWit\EloquentViewable\Support\Period;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use stdClass;

class Manga extends Model implements Viewable
{
    use HasFactory;
    use InteractsWithViews;

    public $_views;
    protected $table = 'mangas';
    protected $fillable = ['name', 'slug', 'des', 'active', 'complete', 'image', 'author', 'last_chapter_uploaded_at', 'tag', 'highlight'];

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'mangas_gerens');
    }
    public function chapters()
    {
        return $this->hasMany(Chapter::class, 'manga_id')->orderBy('order', 'asc');
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable')
            ->latest()
            ->whereNull('parent_id');
    }

    public function favouriteUsers()
    {
        return $this->belongsToMany(User::class, 'favorite_mangas');
    }

    public function followStatus()
    {
        return $this->hasMany(Follow_Status::class, 'manga_id');
    }


    public function getViews()
    {
        $this->_views = new stdClass;

        $this->_views->total  = views($this)
            ->remember(60 * 10)
            ->count();

        $this->_views->month = views($this)
            ->period(Period::pastMonths(1))
            ->remember(60 * 10)
            ->count();

        $this->_views->week = views($this)
            ->period(Period::pastWeeks(1))
            ->remember(60 * 10)
            ->count();

        $this->_views->today = views($this)
            ->period(Period::since(today()))
            ->remember(60 * 10)
            ->count();

        return $this->_views;
    }

    public function getFirstAndLastChapter()
    {
        $firstChapter = Chapter::orderBy('id', 'ASC')->where('manga_id', $this->id)->first();
        $lastChapter = Chapter::orderBy('id', 'DESC')->where('manga_id', $this->id)->first();

        return [
            'firstChapter' => $firstChapter,
            'lastChapter' => $lastChapter,
        ];
    }

    public static function getMangaDetails($slug)
    {
        return self::with('genres', 'chapters', 'comments.replies')
            ->where('slug', $slug)
            ->firstOrFail();
    }

    public static function latestUpdatedPaginate()
    {
        $latestMangas = self::withCount('chapters')
            ->orderBy('last_chapter_uploaded_at', 'desc')
            ->take(10)
            ->get();

        foreach ($latestMangas as $manga) {
            $chapters = $manga->chapters()->orderBy('created_at', 'desc')->take(3)->get();
            $chapterData = $chapters->map(function ($chapter) {
                $chapter->uploaded_at = $chapter->created_at->diffForHumans();
                return $chapter;
            });
            $manga->setRelation('chapters', $chapterData);
            $manga->views = $manga->views()->count();
        }

        return $latestMangas;
    }
    public static function searchManga(array $params = [])
    {
        $query = self::with('genres', 'chapters');

        if (!empty($params['name'])) {
            $query->where('name', 'like', '%' . $params['name'] . '%');
        }
        if (!empty($params['author'])) {
            $query->where('author', 'like', '%' . $params['author'] . '%');
        }
        if (isset($params['complete'])) {
            $query->where('complete', '=', $params['complete']);
        }

        if (!empty($params['genre'])) {
            $query->whereHas('genres', function ($query) use ($params) {
                $query->whereIn('genres.id', (array) $params['genre']);
            });
        }

        // Sắp xếp theo lượt xem
        if (!empty($params['views'])) {
            switch ($params['views']) {
                case 'month':
                    $query->withCount(['views' => function ($query) {
                        $query->whereBetween('viewed_at', [now()->subMonth(), now()]);
                    }])->orderByDesc('views_count');
                    break;
                case 'week':
                    $query->withCount(['views' => function ($query) {
                        $query->whereBetween('viewed_at', [now()->subWeek(), now()]);
                    }])->orderByDesc('views_count')->take(1);
                    break;
                case 'today':
                    $query->withCount(['views' => function ($query) {
                        $query->whereBetween('viewed_at', [now()->startOfDay(), now()]);
                    }])->orderByDesc('views_count');
                    break;
                default:
                    $query->withCount('views')->orderByDesc('views_count');
            }
        }


        if (!empty($params['latest'])) {
            $query->orderBy('last_chapter_uploaded_at', 'desc');
        }

        if (!empty($params['popular'])) {
            $query->where('highlight', 'popular');
        }

        $query->orderBy('id', 'desc');

        return $query->get();
    }

    public static function searchMangaKeyword(string $keyword)
    {
        return self::where('name', 'LIKE', '%' . $keyword . '%')->get();
    }

    public static function getMangaNewest()
    {
        return self::orderBy('created_at', 'desc')
            ->with(['genres', 'chapters' => function ($query) {
                $query->orderBy('order', 'asc');
            }])
            ->get()
            ->map(function ($manga) {
                $chapter = $manga->chapters->last();
                $chapterData = $chapter ? collect([$chapter])->map(function ($chapter) {
                    $chapter->uploaded_at = $chapter->created_at->diffForHumans();
                    return $chapter;
                }) : collect([]);
                $manga->setRelation('chapters', $chapterData);
                return $manga;
            });
    }

    public static function getMangaPopular()
    {
        return self::where('highlight', 'popular')
            ->with(['genres', 'chapters' => function ($query) {
                $query->orderBy('order', 'asc');
            }])
            ->get()
            ->map(function ($manga) {
                $chapter = $manga->chapters->last();
                $chapterData = $chapter ? collect([$chapter])->map(function ($chapter) {
                    $chapter->uploaded_at = $chapter->created_at->diffForHumans();
                    return $chapter;
                }) : collect([]);
                $manga->setRelation('chapters', $chapterData);
                return $manga;
            });
    }

    public static function getMostViewedMangas()
    {
        return self::withCount('views')
            ->with(['genres', 'chapters' => function ($query) {
                $query->orderBy('order', 'desc')->take(1);
            }])
            ->orderBy('views_count', 'desc')
            ->take(5)
            ->get();
    }

    public static function getMostViewedMangasThisWeek()
    {
        $cacheKey = 'most-viewed-mangas-this-week';

        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        $pastWeek = Carbon::now()->subWeek();

        $result = self::withCount(['views' => function ($query) use ($pastWeek) {
            $query->where('viewable_type', self::class)
                ->where('viewed_at', '>=', $pastWeek);
        }])
            ->with(['genres', 'chapters' => function ($query) {
                $query->orderBy('order', 'desc')->take(1);
            }])
            ->orderBy('views_count', 'desc')
            ->take(5)
            ->get();

        Cache::put($cacheKey, $result, Carbon::now()->addHours(1));

        return $result;
    }


    public static function getMostViewedMangasThisMonth()
    {
        $pastMonth = Carbon::now()->subMonth();

        return self::withCount(['views' => function ($query) use ($pastMonth) {
            $query->where('viewable_type', self::class)
                ->where('viewed_at', '>=', $pastMonth);
        }])
            ->with(['genres', 'chapters' => function ($query) {
                $query->orderBy('order', 'desc')->take(1);
            }])
            ->orderBy('views_count', 'desc')
            ->take(5)
            ->get();
    }

    public static function getMostViewedMangasThisDay()
    {
        $pastDay = Carbon::now()->subDay();

        return self::withCount(['views' => function ($query) use ($pastDay) {
            $query->where('viewable_type', self::class)
                ->where('viewed_at', '>=', $pastDay);
        }])
            ->with(['genres', 'chapters' => function ($query) {
                $query->orderBy('order', 'desc')->take(1);
            }])
            ->orderBy('views_count', 'desc')
            ->take(5)
            ->get();
    }
}
