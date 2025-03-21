<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ImpersonationController extends Controller
{
    public function start(Request $request)
    {
        $request->validate(['manager_id' => 'required|exists:users,id']);

        //if (!Auth::user()->can('impersonate')) return response()->json(['error' => 'Unauthorized'], 403);

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



    namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ImpersonateController extends Controller
{
    public function startImpersonation(Request $request, $userId)
    {
        // Validate admin role using the gate
        if (!Auth::user()->can('impersonate')) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Find the user to impersonate
        $userToImpersonate = User::find($userId);

        if (!$userToImpersonate) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Ensure the user is a manager (optional, based on requirements)
        if ($userToImpersonate->role !== 'manager') {
            return response()->json(['error' => 'Can only impersonate managers'], 400);
        }

        // Create a new Sanctum token for the impersonated user with a 1-hour expiration
        $token = $userToImpersonate->createToken('impersonation-token', ['*'], now()->addHours(1))->plainTextToken;

        // Log the impersonation for auditing (optional, but recommended)
        \Log::info('Admin ' . Auth::id() . ' started impersonating user ' . $userId);

        return response()->json(['token' => $token]);
    }
}


}