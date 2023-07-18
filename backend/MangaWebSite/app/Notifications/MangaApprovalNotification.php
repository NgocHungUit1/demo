<?php
namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;

class MangaApprovalNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $user;
    protected $manga;

    public function __construct(User $user, $manga)
    {
        $this->user = $user;
        $this->manga = $manga;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {

        return [
            'id' => $this->user->id,
            'name' => $this->user->name,
            'image' => $this->user->image,
            'manga_id' => $this->manga->id,
        ];
    }

    // public function toBroadcast($notifiable)
    // {
    //     return new BroadcastMessage([
    //         'id' => $this->user->id,
    //         'name' => $this->user->name,
    //         'image' => $this->user->image,
    //         'manga_id' => $this->manga->id,
    //     ]);
    // }
}
