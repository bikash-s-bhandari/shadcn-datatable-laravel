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


Route::prefix('impersonate')->group(function () {
    Route::post('/start', [ImpersonationController::class, 'start'])
        ->middleware(['auth:sanctum', 'admin']);

    Route::post('/stop', [ImpersonationController::class, 'stop'])
        ->middleware(['auth:sanctum', 'impersonate']);
});

Route::post("/auth/login", [AuthController::class, 'login']);
Route::post("/auth/register", [AuthController::class, 'register']);


// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/impersonate/{userId}', [ImpersonateController::class, 'startImpersonation']);
// });