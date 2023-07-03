<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follow_Status extends Model
{
    use HasFactory;
    protected $table = 'follows_status';
    protected $fillable = [
        'manga_id',
        'user_id',
        'status'
    ];

    public function manga()
    {
        return $this->belongsTo(Manga::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
