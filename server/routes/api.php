<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\ProtocolController;
use App\Http\Controllers\AuthController;

Route::middleware('auth:sanctum')->group(function() {
    // SEARCH PERSON BY NAME OR CPF
    Route::get('/person/search', [PersonController::class, 'search']);
    
    // GET ALL PERSON PROTOCOLS
    Route::get('/person/{person}/protocols', [ProtocolController::class, 'getPersonProtocols']);
    
    // CRUD PERSON
    Route::resources(['person' => PersonController::class]);
});

Route::middleware('auth:sanctum')->group(function() {
    // SEARCH PROTOCOL BY NUMBER OR CPF
    Route::get('/protocol/search', [ProtocolController::class, 'searchProtocols']);
    
    // CRUD PROTOCOL
    Route::resources(['protocol' => ProtocolController::class]);
});

// CREATE SYSTEM USER
Route::post('/register', [AuthController::class, 'register']);

// LOGIN E LOGOUT
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
