<?php

namespace App\Services;

use Illuminate\Support\Str;
use App\Models\Manga;
use Illuminate\Support\Facades\Storage;

class MangaService
{
    public function create($data)
    {
        $manga = Manga::create($data);

        // Tự động sinh ra slug từ tên truyện
        $slug = Str::slug($manga->name);
        $manga->slug = $slug;

        $imagePath = $this->saveImageAndGetFilePath($data['image'], $manga->id);

        $data['image'] = $imagePath;
        $manga->update($data);

        $this->syncGenres($manga, $data['genres']);

        return $manga;
    }

    private function saveImageAndGetFilePath($image, $mangaId)
    {
        $fileName = uniqid() . '.' . $image->getClientOriginalExtension();
        $folderPath = "Manga/{$mangaId}";

        if (!Storage::disk('google')->exists($folderPath)) {
            Storage::disk('google')->makeDirectory($folderPath);
        }

        Storage::disk('google')->put("{$folderPath}/{$fileName}", file_get_contents($image));

        return Storage::disk('google')->url("{$folderPath}/{$fileName}");
    }

    public function update($id, $data)
    {
        $manga = Manga::findOrFail($id);

        if (isset($data['image'])) {
            $fileName = $this->saveImageAndGetFileName($data['image'], $manga->id);
            $data['image'] = "Manga/{$manga->id}/{$fileName}";
        }

        try {
            $manga->update($data);

            $this->syncGenres($manga, $data['genres']);
            return $manga;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
    private function syncGenres(Manga $manga, $genres)
    {
        if (!is_null($genres)) {
            $manga->genres()->sync($genres);
        } else {
            $manga->genres()->detach();
        }
    }
}
