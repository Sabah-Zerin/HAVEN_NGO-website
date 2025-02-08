<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        // Validate incoming request data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:3|confirmed',
        ]);

        // Create a new user
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Return a response, could also return a token for authenticated user
        return response()->json(['message' => 'User created successfully'], 201);
    }

      public function login(Request $request)
      {
          // Validate incoming request data
          $validated = $request->validate([
              'email' => 'required|email',
              'password' => 'required|string',
          ]);
  
          // Attempt to authenticate the user
          if (Auth::attempt(['email' => $validated['email'], 'password' => $validated['password']])) {
              $user = Auth::user();
              // Generate a token or return user data (e.g., JWT token or session)
              return response()->json(['message' => 'Login successful', 'user' => $user], 200);
          }
  
          return response()->json(['message' => 'Invalid credentials'], 401);
      }
}
