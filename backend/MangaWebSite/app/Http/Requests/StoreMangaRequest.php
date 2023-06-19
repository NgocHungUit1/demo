<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreMangaRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => [
                'required',
                'unique:mangas,name',
                'max:255',
            ],
            'des' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'author' => 'required|string|max:255',
            'tag' => 'required|string|max:255',
            'genres' => 'required|array|min:1',
            'genres' => ['required', 'array', Rule::exists('genres', 'id')],
        ];
    }
}
