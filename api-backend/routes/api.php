<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ContactMessageController;

// Public Routes
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/admin/register', [AdminController::class, 'register']);
Route::post('/admin/login', [AdminController::class, 'login']);
Route::get('/campaigns', [CampaignController::class, 'index']);

Route::post('/contact', [ContactMessageController::class, 'store']);

// SSLCommerz Callback Routes
Route::post('/payment/success', [PaymentController::class, 'paymentSuccess']);
Route::post('/payment/fail', [PaymentController::class, 'paymentFail']);
Route::post('/payment/cancel', [PaymentController::class, 'paymentCancel']);

// Protected User Routes
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', fn(Request $request) => $request->user());
    Route::post('/payment-init', [PaymentController::class, 'initiatePayment']);
});

// Admin Routes
Route::middleware('auth:admin')->group(function () {
    Route::get('/admin', fn(Request $request) => $request->user());
    Route::apiResource('/campaigns', CampaignController::class)->except(['index']);
});

Route::fallback(fn() => response()->json(['message' => 'Endpoint not found'], 404));