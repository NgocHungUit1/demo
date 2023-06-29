<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\Comment;
use App\Models\Manga;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function createMangaComment(Request $request, Manga $manga)
    {
        $manga->comments()->create([
            'comment'       => $request->comment,
            'parent_id'     => $request->comment_id,
            'user_id'       => Auth::user()->id,
        ]);
        return response()->json(['message' => 'Reply created successfully'], 201);
    }

    // public function showMangaComments(Manga $manga)
    // {
    //     $comments = $manga->comments()->with('user')->get();

    //     $commentsWithReplies = $this->getCommentsWithReplies($comments);

    //     return response()->json(['comments' => $commentsWithReplies], 200);
    // }

    // private function getCommentsWithReplies($comments)
    // {
    //     $commentsWithReplies = [];

    //     foreach ($comments as $comment) {
    //         $commentData = [
    //             'id' => $comment->id,
    //             'comment' => $comment->comment,
    //             'user' => $comment->user,
    //             'replies' => $this->getCommentsWithReplies($comment->replies),
    //         ];

    //         $commentsWithReplies[] = $commentData;
    //     }

    //     return $commentsWithReplies;
    // }


    public function createChapterComment(Request $request, Chapter $chapter)
    {
        $chapter->comments()->create([
            'comment' => $request->comment,
            'parent_id'     => $request->comment_id,
            'user_id' => Auth::user()->id,
        ]);
        return response()->json(['message' => 'Comment created successfully'], 201);
    }

    public function showChapterComments(Chapter $chapter)
    {
        $comments = $chapter->comments()->with(['user'])->get();

        return response()->json(['comments' => $comments], 200);
    }
}
