<?php

namespace App\Providers;

use App\Events\NotificationCreated;
use App\Listeners\NotificationCreatedListener;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        Inertia::share('pusherAppKey', config('broadcasting.connections.pusher.key'));
        Inertia::share('pusherAppSecret', config('broadcasting.connections.pusher.secret'));
        Inertia::share('pusherAppCluster', config('broadcasting.connections.pusher.options.cluster'));
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Event::listen(
        //     NotificationCreated::class,
        //     NotificationCreatedListener::class,
        // );
    }
}
