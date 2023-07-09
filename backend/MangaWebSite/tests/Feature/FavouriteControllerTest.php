<?php

namespace Tests\Feature;

use App\Models\Follow_Status;
use App\Models\Manga;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class FavouriteControllerTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testFavouriteMangasTypeUp()
    {
        // Create a user and manga for testing
        $user = User::factory()->create();
        $manga =  Manga::factory()->create();

        // Authenticate the user
        $this->actingAs($user);

        // Make a POST request to the favourite-manga/{id} endpoint with type = 'up'
        $response = $this->post('api/favourite-manga/' . $manga->id, ['type' => 'up']);

        // Assert that the response has status code 200 (OK)
        $response->assertStatus(200);

        // Assert that the user has the manga in their favouriteMangas relationship
        $this->assertTrue($user->favouriteMangas->contains($manga));
    }

    // Test case when 'type' is not 'up'
    public function testFavouriteMangasTypeNotUp()
    {
        // Create a user and manga for testing
        $user = User::factory()->create();
        $manga =  Manga::factory()->create();

        // Add the manga to the user's favouriteMangas relationship
        $user->favouriteMangas()->attach($manga->id);

        // Authenticate the user
        $this->actingAs($user);

        // Make a POST request to the favourite-manga/{id} endpoint with type != 'up'
        $response = $this->post('api/favourite-manga/' . $manga->id, ['type' => 'down']);

        // Assert that the response has status code 200 (OK)
        $response->assertStatus(200);

        // Assert that the user no longer has the manga in their favouriteMangas relationship
        $this->assertFalse($user->favouriteMangas->contains($manga));
    }

    public function testFollowStatusUpdate()
    {
        // Create a user and manga for testing
        $user = User::factory()->create();
        $manga = Manga::factory()->create();

        // Create a follow status for the user and manga
        $followStatus = Follow_Status::factory()->create([
            'user_id' => $user->id,
            'manga_id' => $manga->id,
        ]);

        // Authenticate the user
        $this->actingAs($user);

        // Make a POST request to the follows-status/{manga_id} endpoint with a new status
        $response = $this->post('api/follows-status/' . $manga->id, ['status' => 'reading']);

        // Assert that the response has status code 200 (OK)
        $response->assertStatus(200);

        // Refresh the follow status from the database
        $followStatus->refresh();

        // Assert that the follow status is updated with the new status
        $this->assertEquals('reading', $followStatus->status);
    }

    // Test case for creating a new follow status
    public function testFollowStatusCreate()
    {
        // Create a user and manga for testing
        $user = User::factory()->create();
        $manga =  Manga::factory()->create();

        // Authenticate the user
        $this->actingAs($user);

        // Make a POST request to the follows-status/{manga_id} endpoint with a status for a new follow
        $response = $this->post('api/follows-status/' . $manga->id, ['status' => 'reading']);

        // Assert that the response has status code 200 (OK)
        $response->assertStatus(200);

        // Assert that a new follow status is created in the database
        $this->assertDatabaseHas('follows_status', [
            'user_id' => $user->id,
            'manga_id' => $manga->id,
            'status' => 'reading',
        ]);
    }
}
