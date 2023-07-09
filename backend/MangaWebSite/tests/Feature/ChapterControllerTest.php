<?php

namespace Tests\Feature;

use App\Models\Chapter;
use App\Models\Manga;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ChapterControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testStoreChapter()
    {
        Storage::fake('google');

        // Tạo manga giả
        $manga = Manga::factory()->create();

        // Tạo data request giả
        $requestData = [
            'name' => 'Chapter Test',
            'image_path' => [
                UploadedFile::fake()->image('chapter1.jpg'),
                UploadedFile::fake()->image('chapter2.jpg'),
            ],
        ];

        // Gọi API để thêm chapter
        $response = $this->post("api/mangas/{$manga->id}/chapter", $requestData);

        // Kiểm tra response status code
        $response->assertStatus(200);

        // Kiểm tra database
        $this->assertDatabaseHas('chapters', [
            'name' => 'Chapter Test',
            'slug_chapter' => 'chapter-test',
            'manga_id' => $manga->id,
        ]);

        $this->assertDatabaseCount('pages', 2); // Kiểm tra có đúng 2 ảnh được lưu trong bảng pages

        // Kiểm tra ảnh đã được lưu trữ trong Google Drive
        Storage::disk('google')->assertExists("Manga/{$manga->slug}/chapter-test/1.jpg");
        Storage::disk('google')->assertExists("Manga/{$manga->slug}/chapter-test/2.jpg");
    }

    public function test_show_method_returns_correct_chapters()
    {
        // Tạo một manga giả định
        $manga = Manga::factory()->create();

        // Tạo một số chapters giả định liên quan đến manga
        $chapters = Chapter::factory(5)->create(['manga_id' => $manga->id]);

        // Gửi request GET tới endpoint '/mangas/{id}/chapter_index'
        $response = $this->get("api/mangas/{$manga->id}/chapter_index");

        // Kiểm tra status code của response
        $response->assertStatus(200);

        // Kiểm tra dữ liệu trả về có đúng format và chứa các chapter đã tạo
        $response->assertJson([
            'data' => $chapters->toArray()
        ]);
    }

    public function test_show_method_returns_404_for_invalid_manga_id()
    {
        // Tạo một manga giả định không tồn tại trong database
        $invalidMangaId = 999;

        // Gửi request GET tới endpoint '/mangas/{id}/chapter_index' với manga id không hợp lệ
        $response = $this->get("/mangas/{$invalidMangaId}/chapter_index");

        // Kiểm tra status code của response
        $response->assertStatus(404);
    }

    public function testPageOfChapter()
    {
        // Create a sample chapter
        $chapter = Chapter::factory()->create();

        // Send a GET request to the endpoint
        $response = $this->get('api/mangas/' . $chapter->id . '/page');

        // Assert that the response has a successful status code (e.g., 200)
        $response->assertStatus(200);

        // Assert that the response JSON contains the chapter's pages
        $response->assertJson([
            'data' => $chapter->pages->toArray()
        ]);
    }
    public function testDestroy()
    {
        // Tạo dữ liệu giả định
        $chapter = Chapter::factory()->create();
        $manga = $chapter->manga;
        $path = "Manga/{$manga->slug}/{$chapter->slug_chapter}";

        // Tạo và lưu trữ tệp tin giả
        Storage::fake('google');
        Storage::disk('google')->put($path . '/file.jpg', 'file content');

        // Gửi yêu cầu xóa chapter
        $response = $this->delete("api/mangas/{$chapter->id}/chapter_delete");

        // Kiểm tra phản hồi
        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Chapter deleted successfully'
            ]);

        // Kiểm tra xem chapter đã bị xóa khỏi cơ sở dữ liệu chưa
        $this->assertDatabaseMissing('chapters', ['id' => $chapter->id]);

        // Kiểm tra xem các trang liên quan đã bị xóa khỏi cơ sở dữ liệu chưa
        $this->assertDatabaseMissing('pages', ['chapter_id' => $chapter->id]);

        // Kiểm tra xem thư mục đã bị xóa khỏi ổ đĩa chưa
        Storage::disk('google')->assertMissing($path);
    }

    public function testUpdateChapterImages()
    {
        // Tạo dữ liệu test
        Storage::fake('google');
        $manga = Manga::factory()->create();
        $chapter = Chapter::factory()->create(['manga_id' => $manga->id]);
        $requestData = [
            'image_path' => [
                UploadedFile::fake()->image('image1.jpg'),
                UploadedFile::fake()->image('image2.jpg'),
            ],
        ];

        // Gọi phương thức updateChapterImages
        $response = $this->post("api/mangas/{$chapter->id}/images", $requestData);

        // Kiểm tra response status code
        $response->assertStatus(200);

        // Kiểm tra dữ liệu trả về
        $response->assertJson(['chapter' => $chapter->toArray()]);

        // Kiểm tra xem các hình ảnh đã được lưu và liên kết đúng cần thiết
        $folderPath = "Manga/{$manga->slug}/{$chapter->slug_chapter}";
        foreach ($requestData['image_path'] as $index => $image) {
            $fileName = ($index + 1) . '.' . $image->getClientOriginalExtension();
            Storage::disk('google')->assertExists("{$folderPath}/{$fileName}");
        }

        // Kiểm tra xem các trang đã được tạo và liên kết đúng cần thiết
        $pages = $chapter->pages()->get();
        foreach ($pages as $page) {
            $this->assertEquals($chapter->id, $page->chapter_id);
            $this->assertEquals($page->order, $page->order);
        }
    }

    public function testPageOfChapterHome()
    {
        // Create a manga
        $manga = Manga::factory()->create();

        // Create chapters for the manga
        $chapter1 = Chapter::factory()->create(['manga_id' => $manga->id, 'order' => 1]);
        $chapter2 = Chapter::factory()->create(['manga_id' => $manga->id, 'order' => 2]);
        $chapter3 = Chapter::factory()->create(['manga_id' => $manga->id, 'order' => 3]);

        // Make a GET request to the pageOfChapter endpoint
        $response = $this->get('api/mangas/chapter/' . $chapter2->id);

        // Assert that the response has a successful status code
        $response->assertOk();

        // Assert that the response data contains the correct chapter information
        $response->assertJson([
            'data' => [
                'chapter' => $chapter2->toArray(),
                'next_chapter' => $chapter3->toArray(),
                'previous_chapter' => $chapter1->toArray(),
            ],
        ]);
    }
}
