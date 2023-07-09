<?php

namespace Database\Factories;

use App\Models\Chapter;
use App\Models\Manga;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chapter>
 */
class ChapterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Chapter::class;

    public function definition()
    {
        $manga = Manga::factory()->create();
        $name = $this->faker->name;
        return [
            'name' => $name,
            'slug_chapter' => Str::slug($name),
            'manga_id' =>  $manga->id,
            'order' => function (array $attributes) {
                // Lấy manga_id từ attributes để tạo order theo từng manga_id
                $mangaId = $attributes['manga_id'];
                // Lấy số lượng chapter của manga hiện tại
                $chapterCount = Chapter::where('manga_id', $mangaId)->count();
                // Tăng giá trị order lên 1 so với chapter cuối cùng của manga này
                return $chapterCount + 1;
            },
        ];
    }
}
