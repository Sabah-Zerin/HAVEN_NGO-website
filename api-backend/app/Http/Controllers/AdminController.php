<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminController extends Controller
{
    // Admin Registration
    public function register(Request $request)
    {
        $request->validate([
            'name'         => 'required|string|max:255',
            'email'        => 'required|string|email|max:255|unique:admins',
            'password'     => 'required|string|min:3',
            'admin_secret' => 'required|string'
        ]);

        // Check the admin secret from the request against the one stored in .env
        if ($request->admin_secret !== env('ADMIN_REGISTRATION_SECRET')) {
            return response()->json(['message' => 'Unauthorized to register as admin'], 403);
        }

        $admin = Admin::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Admin registered successfully'], 201);
    }

    // Admin Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);
    
        $credentials = $request->only('email', 'password');
    
        if (!$token = auth('admin')->attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('admin')->factory()->getTTL() * 60
        ]);
    }

    // Logout (Invalidate JWT)
    public function logout()
    {
        auth('admin')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('admin')->factory()->getTTL() * 60
        ]);
    }
}
