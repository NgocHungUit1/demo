<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMangaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string'],
            'des' => ['nullable', 'string'],
            'author' => ['nullable', 'string'],
            'active' => ['nullable', 'boolean'],
            'complete' => ['nullable', 'boolean'],
            'image' => 'nullable|image|max:2048',
            'genres.*' => ['exists:genres,id'],

        ];
    }
}
