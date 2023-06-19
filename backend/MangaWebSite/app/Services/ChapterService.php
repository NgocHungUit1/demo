<?php

namespace App\Services;

use App\Models\Chapter;
use Illuminate\Support\Str;
use App\Models\Manga;
use App\Models\Page;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ChapterService
{
    public function storeChapter($id, $requestData)
    {
        $manga = Manga::findOrFail($id);

        $validatedData = Validator::make($requestData, [
            'name' => 'required',
            'image_path.*' => 'sometimes|nullable|image|max:2048',
        ])->validate();

        $slug = Str::slug($validatedData['name']);

        $chapter = new Chapter([
            'name' => $validatedData['name'],
            'slug_chapter' => $slug,
            'order' => $manga->chapters()->count() + 1, // Lấy số lượng chapter hiện tại và tăng thêm 1 để tính order cho chapter mới
            'manga_id' => $manga->id
        ]);

        $chapter->save();

        // Save images to Google Drive
        $imageUrls = $this->saveChapterImages($validatedData['image_path'], $manga->slug, $slug);

        // Thêm các ảnh vào bảng trung gian Pages
        foreach ($imageUrls as $index => $imageUrl) {
            $page = new Page([
                'chapter_id' => $chapter->id,
                'image_path' => $imageUrl,
                'order' => $index + 1 // Tăng thứ tự của ảnh lên 1 để tính order cho ảnh mới
            ]);
            $page->save();
        }

        return $chapter;
    }


    private function saveChapterImages($images, $mangaSlug, $slugChapter)
    {
        $imageUrls = [];
        $order = 1;

        if (!empty($images)) {
            foreach ($images as $image) {
                $fileName = $order . '.' . $image->getClientOriginalExtension();
                $folderPath = "Manga/{$mangaSlug}/{$slugChapter}";

                if (!Storage::disk('google')->exists($folderPath)) {
                    Storage::disk('google')->makeDirectory($folderPath);
                }

                Storage::disk('google')->put("{$folderPath}/{$fileName}", file_get_contents($image));

                $imageUrls[] = Storage::disk('google')->url("{$folderPath}/{$fileName}");
                $order++;
            }
        }

        return $imageUrls;
    }
}
