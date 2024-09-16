<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Notifications/Index', [
            'notifications' => Notification::latest()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:240',
            'message' => 'required|string|max:255',
        ]);

        Notification::create($validated);

        return redirect(route('notifications.index'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Notification $notification)
    {
        Gate::authorize('update', $notification);

        $validated = $request->validate([
            'title' => 'required|string|max:240',
            'message' => 'required|string|max:255',
        ]);

        $notification->update($validated);

        return redirect(route('notifications.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        Gate::authorize('delete', $notification);

        $notification->delete();

        return redirect(route('notifications.index'));
    }

    public function setShowCounter(Notification $notification)
    {
        $notification->update([
            'views_count' => $notification->views_count + 1,
        ]);

        return response()->json($notification);
    }
}
