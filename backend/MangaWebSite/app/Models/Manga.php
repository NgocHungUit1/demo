<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manga extends Model
{
    use HasFactory;
    protected $table = 'mangas';
    protected $fillable = ['name', 'slug', 'des', 'active', 'complete', 'image', 'author', 'last_chapter_uploaded_at', 'tag'];

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'mangas_gerens');
    }
    public function chapters()
    {
        return $this->hasMany(Chapter::class, 'manga_id')->orderBy('order', 'asc');
    }
}
