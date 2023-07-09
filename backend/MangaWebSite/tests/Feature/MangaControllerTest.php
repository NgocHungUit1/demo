<?php

namespace Tests\Feature;

use App\Models\Chapter;
use App\Models\Follow_Status;
use App\Models\Genre;
use App\Models\Manga;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class MangaControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        // Tạo các dữ liệu giả lập
        $mangas = Manga::factory()->create();

        // Gửi request GET tới endpoint /mangas
        $response = $this->get('api/mangas');

        // Kiểm tra response có mã HTTP 200 (OK) không
        $response->assertStatus(200);

        // Kiểm tra response có chứa dữ liệu của tất cả manga không
        $response->assertJsonCount($mangas->count(), 'data');
    }

    public function test_new_manga()
    {
        Storage::fake('google');
        $genres = Genre::factory()->create();
        $mangaData = [
            'name' => 'Sample Manga',
            'author' => 'Sample Manga',
            'complete' => '1',
            'genres' => [$genres->id],
            'image' => UploadedFile::fake()->image('sample-image.jpg'),
        ];

        $response = $this->post('api/mangas', $mangaData);

        $response->assertStatus(200)
            ->assertJson(['data' => ['name' => 'Sample Manga']]);

        $this->assertDatabaseHas('mangas', ['name' => 'Sample Manga']);

        $manga = Manga::with('genres')->where('name', 'Sample Manga')->first();
        $this->assertInstanceOf(Manga::class, $manga);
        $this->assertEquals('Sample Manga', $manga->name);
        $this->assertTrue($manga->genres->contains($genres));
    }

    public function test_show_manga()
    {
        // Tạo một manga giả lập trong cơ sở dữ liệu
        $manga = Manga::factory()->create();
        $genre = Genre::factory()->create();
        $manga->genres()->attach($genre);

        // Gửi một yêu cầu GET đến /mangas/{id} với ID của manga được tạo
        $response = $this->get("api/mangas/{$manga->id}");

        // Kiểm tra xem phản hồi có mã trạng thái 200 (OK) hay không
        $response->assertStatus(200);

        // Kiểm tra xem phản hồi có chứa dữ liệu của manga và genres hay không
        $response->assertJson([
            'data' => [
                'id' => $manga->id,
                'name' => $manga->name,
                'des' => $manga->des,
                'author' => $manga->author,
                'active' => $manga->active,
                'complete' => $manga->complete,
                'image' => $manga->image,
                'genres' => $manga->genres->toArray(),
                'tag' => $manga->tag,
                'highlight' => $manga->highlight,
            ]
        ]);
    }


    public function testUpdateShouldUpdateManga()
    {
        // Create a fake manga
        $manga = Manga::factory()->create();
        $genres = Genre::factory()->create();
        // Mock the storage disk
        Storage::fake('google');

        // Set up the request data
        $data = [
            'name' => 'Sample Manga',
            'author' => 'Sample Author',
            'complete' => '1',
            'genres' => [$genres->id],
            'image' => UploadedFile::fake()->image('new-image.jpg'),
        ];

        // Send a PUT request to update the manga
        $response = $this->put("api/mangas/{$manga->id}", $data);

        // Assert that the response is successful
        $response->assertSuccessful();

        // Refresh the manga instance from the database
        $manga->refresh();
        $this->assertEquals('Sample Manga', $manga->name);
        $this->assertEquals('Sample Author', $manga->author);

        // Assert that the genres are synced correctly
        $this->assertCount(count($data['genres']), $manga->genres);
        foreach ($data['genres'] as $genreId) {
            $this->assertContains($genreId, $manga->genres->pluck('id'));
        }
    }

    public function testDestroy()
    {
        // Create a manga record for testing
        $manga = Manga::factory()->create();

        // Mock the Storage facade
        Storage::fake('google');

        // Call the destroy API endpoint
        $response = $this->delete("api/mangas/{$manga->id}");

        // Assert response status code
        $response->assertStatus(200);

        // Assert response JSON structure
        $response->assertJson([
            'status' => 'success',
            'message' => 'Manga deleted successfully'
        ]);

        // Assert that the manga record has been deleted from the database
        $this->assertDatabaseMissing('mangas', [
            'id' => $manga->id,
        ]);

        // Assert that the manga image and folder have been deleted from storage
        Storage::disk('google')->assertMissing("Manga/{$manga->slug}/{$manga->image}");
        Storage::disk('google')->assertMissing("Manga/{$manga->slug}");
    }

    public function testGetMangaHome()
    {
        // Tạo dữ liệu giả lập cho các phương thức liên quan

        // Tạo danh sách manga mới nhất
        $newestMangas = Manga::factory(3)->create();
        $newestMangas = $newestMangas->sortByDesc('created_at');

        // Tạo danh sách manga phổ biến
        $popularMangas =  Manga::factory(3)->create(['highlight' => 'popular']);

        // Tạo danh sách manga được cập nhật gần đây nhất
        $latestUpdatedMangas =  Manga::factory(3)->create();
        $latestUpdatedMangas = $latestUpdatedMangas->sortByDesc('last_chapter_uploaded_at');

        foreach ($latestUpdatedMangas as $manga) {
            // Tạo chapters cho từng manga
            $chapters =  Chapter::factory(3)->create([
                'manga_id' => $manga->id,
                'created_at' => now(),
            ]);

            $chapters = $chapters->sortByDesc('created_at');

            $manga->setRelation('chapters', $chapters);
            $manga->setRelation('views', $chapters->count());
        }

        // Gọi phương thức getMangaHome từ controller
        $response = $this->get('api/home');

        // Kiểm tra kết quả trả về
        $response->assertStatus(200)
            ->assertJson([
                'getMangaNew' => $newestMangas->toArray()
            ]);
    }

    public function testMangaDetails()
    {
        // Tạo một manga giả định với slug 'manga-slug'
        $manga = Manga::factory()->create(['slug' => 'manga-slug']);

        // Gọi route '/manga/details/manga-slug'
        $response = $this->get('api/manga/details/manga-slug');

        // Kiểm tra rằng response có status code 200 (OK)
        $response->assertStatus(200);

        // Kiểm tra rằng response là JSON
        $response->assertJson([
            'manga' => [
                'slug' => $manga->slug,
                // Kiểm tra các thuộc tính khác của manga
                // ví dụ: 'name', 'genres', 'chapters', ...
            ],
        ]);
    }

    public function testGetByStatus()
    {
        // Tạo user và đăng nhập
        $user = User::factory()->create();
        $this->actingAs($user);

        // Tạo một manga và follow_status tương ứng
        $manga = Manga::factory()->create();
        $followStatus = Follow_Status::factory()->create([
            'manga_id' => $manga->id,
            'user_id' => $user->id,
            'status' => 'reading', // Thay đổi trạng thái theo yêu cầu của bạn
        ]);

        // Gọi API để lấy danh sách mangas có status tương ứng
        $response = $this->get('api/follows?status=reading'); // Thay đổi status theo yêu cầu của bạn

        // Kiểm tra phản hồi HTTP có mã 200 OK không
        $response->assertStatus(200);

        // Kiểm tra rằng response JSON chứa thông tin manga đã được trả về
        $response->assertJson(['mangas' => [$manga->toArray()]]);
    }
}
