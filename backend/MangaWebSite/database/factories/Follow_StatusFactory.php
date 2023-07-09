<?php

namespace Database\Factories;

use App\Models\Follow_Status;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Follow_Status>
 */


class Follow_StatusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Follow_Status::class;

    public function definition()
    {
        return [
            'manga_id' => function () {
                // Lấy một ID ngẫu nhiên từ bảng "mangas"
                return \App\Models\Manga::inRandomOrder()->first()->id;
            },
            'user_id' => function () {
                // Lấy một ID ngẫu nhiên từ bảng "users"
                return \App\Models\User::inRandomOrder()->first()->id;
            },
            'status' => $this->faker->randomElement(['reading', 'completed', 'plan-to-read', 'dropped']),
        ];
    }
}
