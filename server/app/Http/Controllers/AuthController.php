<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
        
        $token = $user->createToken('auth-token')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token
        ];
        return response()->json(['message' => 'User registered successfully', 'data' => $response], 201);
    }

    public function login(Request $request) {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        $token = $user->createToken('auth-token')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token
        ];
        return response()->json(['message' => 'Successful login', 'data' => $response], 200);
    }

    public function logout() {
        auth()->user()->tokens()->delete();
        return response()->json(['message' => 'Successfully logged out'], 200);
    }
}