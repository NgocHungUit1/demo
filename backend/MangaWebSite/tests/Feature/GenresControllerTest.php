<?php

namespace Tests\Feature;

use App\Models\Genre;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GenreControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        // Tạo dữ liệu giả lập
        $genres = Genre::factory()->create();

        // Gửi request GET tới '/genres'
        $response = $this->get('api/genres');

        // Kiểm tra mã trạng thái HTTP có phải là 200 (OK) không
        $response->assertStatus(200);
    }

    public function testStore()
    {
        // Tạo dữ liệu giả lập
        $data = [
            'name' => 'Genre Name',
        ];

        // Gửi request POST tới '/genres'
        $response = $this->json('POST', 'api/genres', $data);

        // Kiểm tra kết quả trả về (status code, dữ liệu)
        $response->assertStatus(201);
        $response->assertJson([
            'data' => [
                'name' => 'Genre Name',
                'slug_genre' => 'genre-name' // Chỉnh sửa nếu bạn muốn theo quy tắc khác
            ]
        ]);

        // Kiểm tra xem dữ liệu đã được lưu vào cơ sở dữ liệu hay chưa
        $this->assertDatabaseHas('genres', [
            'name' => 'Genre Name',
            'slug_genre' => 'genre-name' // Chỉnh sửa nếu bạn muốn theo quy tắc khác
        ]);
    }

    public function testShow()
    {
        // Tạo một genre ảo trong cơ sở dữ liệu
        $genre = Genre::factory()->create();

        // Gửi một GET request tới route 'genres/{id}'
        $response = $this->get('api/genres/' . $genre->id);

        // Kiểm tra response status code
        $response->assertStatus(200);

        // Kiểm tra response có chứa dữ liệu của genre đã tạo không
        $response->assertJson([
            'data' => [
                'id' => $genre->id,
                'name' => $genre->name,
                //Thêm các thuộc tính khác của Genre nếu có
            ]
        ]);
    }

    public function testUpdate()
    {
        // Tạo một genre ảo trong cơ sở dữ liệu
        $genre = Genre::factory()->create();

        // Tạo dữ liệu giả để cập nhật genre
        $updatedData = [
            'name' => 'Updated Genre',
            //Thêm các thuộc tính khác của Genre muốn cập nhật
        ];

        // Gửi một PUT request tới route 'genres/{id}' với dữ liệu cập nhật
        $response = $this->put('api/genres/' . $genre->id, $updatedData);

        // Kiểm tra response status code
        $response->assertStatus(200);

        // Lấy genre từ cơ sở dữ liệu sau khi cập nhật
        $updatedGenre = Genre::findOrFail($genre->id);

        // Kiểm tra xem genre đã được cập nhật đúng như mong đợi không
        $this->assertEquals($updatedData['name'], $updatedGenre->name);
        // Kiểm tra các thuộc tính khác của Genre nếu có

        // Kiểm tra response có chứa dữ liệu của genre đã cập nhật không
        $response->assertJson([
            'data' => [
                'id' => $updatedGenre->id,
                'name' => $updatedGenre->name,
                //Thêm các thuộc tính khác của Genre nếu có
            ]
        ]);
    }

    public function testDestroy()
    {
        // Tạo một genre ảo trong cơ sở dữ liệu
        $genre = Genre::factory()->create();

        // Gửi một DELETE request tới route 'genres/{id}'
        $response = $this->delete('api/genres/' . $genre->id);

        // Kiểm tra response status code
        $response->assertStatus(204);

        // Kiểm tra xem genre đã bị xóa khỏi cơ sở dữ liệu không
        $this->assertDatabaseMissing('genres', ['id' => $genre->id]);
    }
}
