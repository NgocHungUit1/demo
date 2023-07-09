<?php

namespace Database\Factories;

use App\Models\Manga;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Genre;
use App\Models\Manga_Genres;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Manga>
 */

class MangaFactory extends Factory
{
    protected $model = Manga::class;

    public function definition()
    {
        // Định nghĩa các thuộc tính cho manga
        $name = $this->faker->name;
        $des = $this->faker->paragraph;
        $active = true;
        $complete = false;
        $image = $this->faker->imageUrl;
        $author = $this->faker->name;
        $lastChapterUploadedAt = now();
        $slug = Str::slug($name);
        $highlight = $this->faker->randomElement(['new', 'popular']);

        return [
            'name' => $name,
            'des' => $des,
            'active' => $active,
            'complete' => $complete,
            'image' => $image,
            'author' => $author,
            'last_chapter_uploaded_at' => $lastChapterUploadedAt,
            'slug' => $slug,
            'highlight' => $highlight,
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Manga $manga) {
            // Tạo quan hệ ngẫu nhiên giữa manga và genre
            $genreIds = Genre::pluck('id')->toArray();
            if (empty($genreIds)) {
                // Xử lý khi không có genre nào tồn tại
                return;
            }
            $mangaGenres = [];
            for ($i = 0; $i < rand(1, 3); $i++) {
                $genreId = $this->faker->randomElement($genreIds);

                if (!in_array($genreId, array_column($mangaGenres, 'genre_id'))) {
                    $mangaGenres[] = [
                        'manga_id' => $manga->id,
                        'genre_id' => $genreId,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }

            Manga_Genres::insert($mangaGenres);

            $chapterCount = rand(5, 10);
            for ($i = 1; $i <= $chapterCount; $i++) {
                $chapterName = 'Chapter ' . $i;
                $chapterSlug = Str::slug($chapterName);
                $chapterOrder = $i;

                $chapter = $manga->chapters()->create([
                    'name' => $chapterName,
                    'order' => $chapterOrder,
                    'slug_chapter' => $chapterSlug,
                ]);

                $pageCount = rand(10, 20);
                for ($j = 1; $j <= $pageCount; $j++) {
                    $pageOrder = $j;
                    $imagePath = $this->faker->imageUrl;

                    $chapter->pages()->create([
                        'order' => $pageOrder,
                        'image_path' => $imagePath,
                    ]);
                }
            }
        });
    }
}
