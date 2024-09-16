<?php

namespace App\Models;

use App\Events\NotificationCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Notification extends Model
{
    use HasFactory, Notifiable;

    protected $dispatchesEvents = [
        'created' => NotificationCreated::class,
    ];

    protected $fillable = [
        'title',
        'message',
        'views_count'
    ];
}
