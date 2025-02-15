<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\AuthController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('inventories', InventoryController::class);
    Route::apiResource('clients', ClientController::class);
    Route::apiResource('suppliers', SupplierController::class);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']); 
