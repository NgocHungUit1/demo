<?php

namespace Database\Factories;

use App\Models\Genre;
use App\Models\Manga;
use App\Models\Manga_Genres;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Manga_Genres>
 */
class Manga_GenresFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Manga_Genres::class;
    public function definition()
    {
        return [
            'manga_id' => function () {
                return Manga::factory()->create()->id;
            },
            'genre_id' => function () {
                return Genre::factory()->create()->id;
            },
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
