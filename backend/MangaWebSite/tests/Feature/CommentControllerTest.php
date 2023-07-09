<?php

namespace Tests\Feature;

use App\Models\Manga;
use App\Models\User;
use App\Models\Chapter;
use App\Models\Comment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CommentControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testCreateMangaComment()
    {
        // Tạo người dùng và đăng nhập
        $user = User::factory()->create();
        $this->actingAs($user);

        // Tạo một manga và lưu vào cơ sở dữ liệu
        $manga = Manga::factory()->create();

        // Gọi phương thức API để tạo comment mới cho manga
        $commentData = [
            'comment' => 'This is a test comment.',
            'parent_id' => null,
        ];
        $response = $this->post('/api/manga/' . $manga->id . '/comments', $commentData);

        // Kiểm tra xem response có trả về mã status 201 - Created hay không
        $response->assertStatus(201);

        // Kiểm tra xem comment đã được tạo thành công và lưu vào cơ sở dữ liệu chưa
        $this->assertDatabaseHas('comments', [
            'commentable_type' => Manga::class,
            'commentable_id' => $manga->id,
            'user_id' => $user->id,
            'comment' => $commentData['comment'],
            'parent_id' => $commentData['parent_id'],
        ]);

        // Kiểm tra xem comment được trả về trong response có đúng thông tin như đã tạo hay không
        $response->assertJson([
            'message' => 'Reply created successfully',
        ]);
    }

    public function testCreateChapterComment()
    {
        // Tạo người dùng và đăng nhập
        $user = User::factory()->create();
        $this->actingAs($user);

        // Tạo một manga và lưu vào cơ sở dữ liệu
        $chapter = Chapter::factory()->create();

        // Gọi phương thức API để tạo comment mới cho manga
        $commentData = [
            'comment' => 'This is a test comment.',
            'parent_id' => null,
        ];
        $response = $this->post('/api/chapter/' . $chapter->id . '/comments', $commentData);

        // Kiểm tra xem response có trả về mã status 201 - Created hay không
        $response->assertStatus(201);

        // Kiểm tra xem comment đã được tạo thành công và lưu vào cơ sở dữ liệu chưa
        $this->assertDatabaseHas('comments', [
            'commentable_type' => Chapter::class,
            'commentable_id' => $chapter->id,
            'user_id' => $user->id,
            'comment' => $commentData['comment'],
            'parent_id' => $commentData['parent_id'],
        ]);
    }


    public function testUnauthenticatedUserCannotCreateMangaComment()
    {
        // Không đăng nhập

        // Tạo một manga
        $manga = Manga::factory()->create();

        // Gọi phương thức API để tạo comment mới cho manga
        $commentData = [
            'comment' => 'This is a test comment.',
            'parent_id' => null,
        ];

        // Gửi request để tạo bình luận
        $response = $this->post('/api/manga/' . $manga->id . '/comments', $commentData);


        // Kiểm tra xem người dùng không được phép tạo bình luận
        $response->assertStatus(302);
    }
}
