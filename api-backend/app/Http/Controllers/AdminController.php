<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // Admin Registration (with secret check)
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
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $admin->createToken('adminToken')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token'   => $token,
            'admin'   => $admin
        ]);
    }

    // Logout (logs out the current session)
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}
