<?php
use App\Http\Controllers\PaymentController;

use Illuminate\Support\Facades\Route;
Route::post('/pay', [PaymentController::class, 'initiatePayment'])->name('pay');
Route::get('/payment-success', [PaymentController::class, 'success']);
Route::get('/payment-fail', [PaymentController::class, 'fail']);

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return ['Laravel' => app()->version()];
});


require __DIR__.'/auth.php';
