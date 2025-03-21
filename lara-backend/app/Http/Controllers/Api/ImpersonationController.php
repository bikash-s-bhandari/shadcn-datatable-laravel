<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ImpersonationController extends Controller
{
    public function start(Request $request)
    {
        $request->validate(['manager_id' => 'required|exists:users,id']);
        $manager = User::findOrFail($request->manager_id);

        if (Gate::denies('impersonate', $manager)) {
            return response()->json([
                'message' => 'Unauthorized to impersonate this user'
            ], 403);
        }

        // Create impersonation token with limited scope
        $token = $manager->createToken('impersonation-token', [
            'impersonated',
            'manager:access'
        ])->plainTextToken;

        // Log the impersonation
        // Impersonation::create([
        //     'admin_id' => $request->user()->id,
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
        $impersonation = Impersonation::where('admin_id', $request->user()->id)
            ->whereNull('left_at')
            ->latest()
            ->firstOrFail();

        // Restore admin token
        $admin = User::find($impersonation->admin_id);
        $token = $admin->createToken('auth-token', [
            'admin',
            'basic-access'
        ])->plainTextToken;

        $impersonation->update(['left_at' => now()]);

        return response()->json([
            'message' => 'Impersonation ended',
            'token' => $token,
            'user' => $admin->only('id', 'name', 'email'),
        ]);
    }
}