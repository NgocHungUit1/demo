<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    use HasFactory;
    protected $table = 'chapters';
    protected $fillable = ['name', 'slug_chapter', 'order', 'manga_id'];

    public function pages()
    {
        return $this->hasMany(Page::class, 'chapter_id');
    }

    public function manga()
    {
        return $this->belongsTo(Manga::class);
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable')
            ->latest()
            ->whereNull('parent_id');
    }
}
