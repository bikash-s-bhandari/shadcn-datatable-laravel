<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{

    public function index()
    {
        $managers = User::where('role', 'manager')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Manager list',
            'data' => [

                'managers' => $managers
            ]
        ], 200);
    }
}