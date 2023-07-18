<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\SocialController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\Client\CommentController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\MangaController;
use App\Http\Controllers\Client\DetailsController;
use App\Http\Controllers\Client\ViewChapterController;
use App\Http\Controllers\FollowController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api')->name('logout');

//Admin

Route::get('/dashboard', [AuthController::class, 'dashboard']);

Route::get('/user', [SocialController::class, 'user']);
Route::get('categories', [CategoryController::class, 'index']);
Route::post('categories', [CategoryController::class, 'store']);
Route::get('categories/{id}', [CategoryController::class, 'show']);
Route::put('categories/{id}', [CategoryController::class, 'update']);
Route::delete('categories/{id}', [CategoryController::class, 'destroy']);

Route::get('/genres', [GenreController::class, 'index']);
Route::post('genres', [GenreController::class, 'store']);
Route::get('genres/{id}', [GenreController::class, 'show']);
Route::put('genres/{id}', [GenreController::class, 'update']);
Route::delete('genres/{id}', [GenreController::class, 'destroy']);

Route::get('/mangas', [MangaController::class, 'index']);
Route::get('/mangas-customer', [MangaController::class, 'comicCustomer']);
Route::get('/mangas-customer/{manga_id}', [MangaController::class, 'approveManga']);
Route::get('/mangas/{id}', [MangaController::class, 'show']);

Route::put('/mangas/{id}', [MangaController::class, 'update']);
Route::delete('/mangas/{id}', [MangaController::class, 'destroy']);

Route::post('/mangas/{id}/chapter', [ChapterController::class, 'store']);
Route::get('/mangas/{id}/chapter_index', [ChapterController::class, 'show']);
Route::get('/mangas/{id}/page', [ChapterController::class, 'pageOfChapter']);
Route::delete('/mangas/{chapter_id}/chapter_delete', [ChapterController::class, 'destroy']);
Route::post('/mangas/{chapter_id}/images', [ChapterController::class, 'updateImages']);

//Web chính

//Chapter
Route::get('/mangas/chapter/{id_chapter}', [ViewChapterController::class, 'pageOfChapter']);

//Details
Route::get('/manga/details/{slug}', [DetailsController::class, 'mangaDetails']);
Route::get('/comment/details/{id_manga}', [DetailsController::class, 'commentDetails']);
//Home
Route::get('/home', [AppController::class, 'getMangaHome']);
Route::get('/home/topviews', [AppController::class, 'getMangaViews']);
//Social login
Route::get('/google', [SocialController::class, 'loginGoogleUrl']);
Route::get('/auth/callback', [SocialController::class, 'loginGoogleCallback']);


Route::middleware(['auth:api'])->group(function () {
    Route::post('/mangas', [MangaController::class, 'store']);
    //Comment
    Route::post('/chapter/{chapter}/comments', [CommentController::class, 'createChapterComment']);
    Route::post('/manga/{manga}/comments', [CommentController::class, 'createMangaComment']);
    Route::get('/manga/{manga}/comments', [CommentController::class, 'showMangaComments']);
    Route::get('/chapter/{chapter}/comments', [CommentController::class, 'showChapterComments']);

    //Favourite Mangas
    Route::post('favourite-manga/{id}', [DetailsController::class, 'favouriteMangas']);

    //Follow status
    Route::post('follows-status/{manga_id}', [FollowController::class, 'follow']);
    Route::get('follows', [FollowController::class, 'getByStatus']);
    Route::get('likes/{manga_id}', [DetailsController::class, 'likes']);
});
