<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ImpersonationController;
use App\Http\Controllers\Api\AdminController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/projects', [ProjectController::class, 'index']);
    Route::post("/auth/logout", [AuthController::class, 'logout']);

    Route::get('/managers', [AdminController::class, 'index'])->middleware('admin');
});


// Protected example route
// Route::middleware('auth:sanctum')->get('/projects', function (Request $request) {
//     if ($request->user()->currentAccessToken()->can('manager:access')) {
//         return $request->user()->projects;
//     }

//     return response()->json(['message' => 'Unauthorized'], 403);
// });

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/check', [AuthController::class, 'checkAuth'])->middleware('auth:sanctum');
});





Route::middleware(['auth:sanctum', 'admin'])->prefix('impersonate')->group(function () {
    Route::post('/start', [ImpersonationController::class, 'start']);
    Route::post('/stop', [ImpersonationController::class, 'stop']);
});





Route::post("/auth/login", [AuthController::class, 'login']);
Route::post("/auth/register", [AuthController::class, 'register']);


// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/impersonate/{userId}', [ImpersonateController::class, 'startImpersonation']);
// });