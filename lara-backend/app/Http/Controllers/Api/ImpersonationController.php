<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class ImpersonationController extends Controller
{
        public function start(Request $request)
    {
        $request->validate(['manager_id' => 'required|exists:users,id']);

        $manager = User::where('role', 'manager')->findOrFail($request->manager_id);

        abort_unless($request->user()->isAdmin(), 403, 'Unauthorized');

        $token = $manager->createToken('impersonation-token', [
            'impersonated',
            'manager:projects:list'
        ])->plainTextToken;

        // Impersonation::create([
        //     'admin_id' => auth()->id(),
        //     'manager_id' => $manager->id,
        //     'impersonated_at' => now(),
        // ]);

        return response()->json([
            'token' => $token,
            'manager' => $manager->only('id', 'name', 'email'),
        ]);
    }

    public function stop(Request $request)
    {
        // $impersonation = Impersonation::where('admin_id', $request->user()->id)
        //     ->whereNull('left_at')
        //     ->latest()
        //     ->firstOrFail();

        // $impersonation->update(['left_at' => now()]);

        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Impersonation ended successfully',
            'original_user' => $request->user()->only('id', 'name', 'email'),
        ]);
    }


}