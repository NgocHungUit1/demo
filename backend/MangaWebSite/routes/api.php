<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\MangaController;
use App\Models\Genre;
use Illuminate\Http\Request;
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
Route::middleware(['auth:api', 'role:admin'])->group(function () {
    Route::get('/dashboard', [AuthController::class, 'dashboard'])->name('dashboard');
    Route::get('categories', [CategoryController::class, 'index']);
    Route::post('categories', [CategoryController::class, 'store']);
    Route::get('categories/{id}', [CategoryController::class, 'show']);
    Route::put('categories/{id}', [CategoryController::class, 'update']);
    Route::delete('categories/{id}', [CategoryController::class, 'destroy']);

    Route::get('genres', [GenreController::class, 'index']);
    Route::post('genres', [GenreController::class, 'store']);
    Route::get('genres/{id}', [GenreController::class, 'show']);
    Route::put('genres/{id}', [GenreController::class, 'update']);
    Route::delete('genres/{id}', [GenreController::class, 'destroy']);

    Route::get('/mangas', [MangaController::class, 'index']);
    Route::get('/mangas/{id}', [MangaController::class, 'show']);
    Route::post('/mangas', [MangaController::class, 'store']);
    Route::patch('/mangas/{id}', [MangaController::class, 'update']);
    Route::delete('/mangas/{id}', [MangaController::class, 'destroy']);
    Route::get('/mangas/search/{tag}', [MangaController::class, 'tag']);

    Route::post('/mangas/{id}/chapter', [ChapterController::class, 'store']);
    Route::get('/mangas/{id}/chapter_index', [ChapterController::class, 'show']);
    Route::delete('/mangas/{chapter_id}/chapter_delete', [ChapterController::class, 'destroy']);
});
