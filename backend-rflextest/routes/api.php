<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MoneyController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(MoneyController::class)->group(function ()
{
    Route::get('/standardollars','getStandarMoneyByDateRange');
    Route::get('/dollars','getMoneyByDateRange');
});
