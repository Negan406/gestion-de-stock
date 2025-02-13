<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Define the forgot password route
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
