<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    use RefreshDatabase;

    public function testLoginWithValidCredentials()
    {
        // Tạo một người dùng để đăng nhập
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password'), // Thay đổi mật khẩu theo yêu cầu của bạn
        ]);

        // Gọi API để đăng nhập với thông tin đăng nhập hợp lệ
        $response = $this->postJson('api/login', [
            'email' => 'test@example.com',
            'password' => 'password', // Thay đổi mật khẩu theo yêu cầu của bạn
        ]);

        // Kiểm tra phản hồi HTTP có mã 200 OK không
        $response->assertStatus(200);

        // Kiểm tra rằng phản hồi JSON chứa token truy cập và loại token đúng như mong đợi
        $response->assertJsonStructure([
            'access_token',
            'token_type',
            'expires_at',
        ]);
    }

    public function testLoginWithInvalidCredentials()
    {
        // Gọi API để đăng nhập với thông tin đăng nhập không hợp lệ
        $response = $this->postJson('api/login', [
            'email' => 'invalid@example.com',
            'password' => 'wrong-password', // Thay đổi mật khẩu theo yêu cầu của bạn
        ]);

        // Kiểm tra phản hồi HTTP có mã 401 Unauthorized không
        $response->assertStatus(401);

        // Kiểm tra rằng phản hồi JSON chứa thông báo lỗi đúng như mong đợi
        $response->assertJson(['error' => 'Invalid credentials.']);
    }

    public function testLogout()
    {
        // Tạo một người dùng và xác thực người dùng
        $user = User::factory()->create();
        $this->actingAs($user);
        // // Gọi API để đăng xuất
        $response = $this->post('api/logout');
        $this->assertFalse(Auth::check());
        // // Kiểm tra phản hồi HTTP có mã 200 OK không
        $response->assertStatus(200);

        // // Kiểm tra rằng phản hồi JSON chứa thông báo đúng như mong đợi
        // $response->assertJson(['message' => 'Logged out']);

        // // Kiểm tra rằng token của người dùng đã bị xóa
        // $this->assertFalse($user->tokens()->exists());
    }
}
