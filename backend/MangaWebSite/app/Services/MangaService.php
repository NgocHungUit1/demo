<?php

namespace App\Services;

use Illuminate\Support\Str;
use App\Models\Manga;
use Illuminate\Support\Facades\Storage;

class MangaService
{
    public function create($data, $userCreated)
    {
        $manga = Manga::create($data);

        // Tự động sinh ra slug từ tên truyện
        $slug = Str::slug($manga->name);
        $manga->slug = $slug;

        $imagePath = $this->saveImageAndGetFilePath($data['image'], $slug);

        $data['image'] = $imagePath;
        $data['user_created'] = $userCreated; // Thêm thông tin người dùng tạo manga vào dữ liệu

        $manga->update($data);

        $this->syncGenres($manga, $data['genres']);

        return $manga;
    }


    private function saveImageAndGetFilePath($image, $slug)
    {
        $fileName = uniqid() . '.' . $image->getClientOriginalExtension();
        $folderPath = "Manga/{$slug}";

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
            // Cập nhật hình ảnh
            $folderPath = "Manga/{$manga->slug}";

            // Delete image
            $fileName = basename($manga->image);
            Storage::disk('google')->delete("{$folderPath}/{$fileName}");

            // Delete manga folder
            if (Storage::disk('google')->exists($folderPath)) {
                Storage::disk('google')->deleteDirectory($folderPath);
            }
            $data['image'] = $this->saveImageAndGetFilePath($data['image'], $manga->slug);
        }

        try {
            // Cập nhật thông tin khác
            if (isset($data['genres'])) {
                $this->syncGenres($manga, $data['genres']);
                unset($data['genres']);
            }
            $manga->update($data);

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
