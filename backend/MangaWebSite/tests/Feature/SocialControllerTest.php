<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Mockery;
use Laravel\Socialite\Facades\Socialite;

class SocialControllerTest extends TestCase
{
    public function testLoginGoogleUrl()
    {
        // Mock lời gọi hàm và giá trị trả về
        $mockUrl = 'mocked-google-login-url';

        Socialite::shouldReceive('driver')
            ->once()
            ->with('google')
            ->andReturnSelf();

        Socialite::shouldReceive('stateless')
            ->once()
            ->andReturnSelf();

        Socialite::shouldReceive('redirect')
            ->once()
            ->andReturnSelf();

        Socialite::shouldReceive('getTargetUrl')
            ->once()
            ->andReturn($mockUrl);

        // Kiểm tra kết quả của hàm
        $response = $this->get('api/google');
        $response->assertStatus(200);
        $response->assertJson([
            'url' => $mockUrl,
        ]);
    }

    // public function testLoginGoogleCallback()
    // {
    //     // Mock lời gọi hàm và giá trị trả về
    //     $mockUserId = 'mocked-user-id';
    //     $mockUserName = 'John Doe';
    //     $mockUserEmail = 'john.doe@example.com';
    //     $mockUserAvatar = 'https://example.com/avatar.jpg';

    //     $mockUser = new \stdClass();
    //     $mockUser->id = $mockUserId;
    //     $mockUser->name = $mockUserName;
    //     $mockUser->email = $mockUserEmail;
    //     $mockUser->avatar = $mockUserAvatar;

    //     $socialiteMock = Mockery::mock('alias:' . Socialite::class);
    //     $socialiteMock->shouldReceive('driver->stateless->user')
    //         ->once()
    //         ->andReturn($mockUser);

    //     // Mock lời gọi đến Socialite
    //     $socialiteMock = Mockery::mock('alias:' . Socialite::class);
    //     $socialiteMock->shouldReceive('driver->stateless->user')
    //         ->once()
    //         ->andReturn($mockUser);

    //     // Mock lời gọi đến User model
    //     $userMock = Mockery::mock('overload:' . User::class);
    //     $userMock->shouldReceive('where->first')
    //         ->once()
    //         ->with('google_id', $mockUserId)
    //         ->andReturn(null);

    //     $userMock->shouldReceive('create')
    //         ->once()
    //         ->andReturnUsing(function ($data) use ($mockUserId, $mockUserName, $mockUserEmail, $mockUserAvatar) {
    //             $user = new User();
    //             $user->id = $mockUserId;
    //             $user->name = $mockUserName;
    //             $user->email = $mockUserEmail;
    //             $user->google_id = $mockUserId;
    //             $user->password = Hash::make('123123');
    //             $user->role = 'customer';
    //             $user->image = $mockUserAvatar;
    //             return $user;
    //         });

    //     // Mock lời gọi đến Auth
    //     $authMock = Mockery::mock('overload:' . Auth::class);
    //     $authMock->shouldReceive('login')
    //         ->once()
    //         ->with(Mockery::type(User::class));

    //     // Kiểm tra kết quả của hàm
    //     $response = $this->get('/auth/callback');
    //     $response->assertStatus(200);
    //     $response->assertJson([
    //         'status' => true,
    //         'access_token' => Mockery::any(),
    //         'token_type' => 'Bearer',
    //         'user' => Mockery::type(User::class),
    //     ]);
    // }
}
