<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Models\Impersonation;

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

        // Store impersonation state in session
        // $request->session()->put('impersonation', [
        //     'admin_id' => $request->user()->id,
        //     'manager_id' => $manager->id,
        //     'started_at' => now(),
        // ]);

        // Create impersonation token with limited scope
        $token = $manager->createToken('impersonation-token', [
            'impersonated',
            'manager:access'
        ])->plainTextToken;


        Impersonation::create([
            'impersonator_id' => auth()->id(),
            'impersonating_id' => $manager->id,
            'impersonated_at' => now(),
        ]);

        return response()->json([
            'token' => $token,
            'manager' => $manager->only('id', 'name', 'email', 'role'),
        ]);
    }

    public function stop(Request $request)
    {
        // $impersonation = $request->session()->get('impersonation');

        $impersonation = Impersonation::where(
            'impersonator_id',
            $request->impersonatorId
        )
            ->whereNull('left_at')
            ->latest()
            ->firstOrFail();

        info(json_encode($impersonation));

        if (!$impersonation) {
            abort(403, 'No active impersonation session');
        }

        $impersonation->update(['left_at' => now()]);
        $request->user()->currentAccessToken()->delete();



        // Get original admin user
        $admin = User::findOrFail($impersonation->impersonator_id);

        // Clear impersonation session
        // $request->session()->forget('impersonation');

        // Create new admin token
        $token = $admin->createToken('admin-token', ['admin'])->plainTextToken;

        return response()->json([
            'message' => 'Impersonation ended',
            'token' => $token,
            'user' => $admin->only('id', 'name', 'email', 'role'),
        ]);
    }
}