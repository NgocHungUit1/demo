<?php

namespace Database\Factories;

use App\Models\Genre;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Genre>
 */
class GenreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Genre::class;
    public function definition()
    {
        $name = $this->faker->name; // Tạo tên ngẫu nhiên cho manga (có thể thay bằng dữ liệu khác phù hợp)
        return [
            'name' => $name,
            'slug_genre' => Str::slug($name), // Tạo slug từ tên của manga
        ];
    }
}
