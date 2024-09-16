<?php

use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

Route::post('/notifications/counter-up/{notification}', [NotificationController::class, 'setShowCounter']);
