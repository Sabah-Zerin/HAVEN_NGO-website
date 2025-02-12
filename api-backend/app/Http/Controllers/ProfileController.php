<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function getUserProfile()
    {
        // Get the authenticated user
        $user = Auth::user();

        // Return user data (name, email) as a JSON response
        return response()->json([
            'name' => $user->name,
            'email' => $user->email
        ]);
    }
}
