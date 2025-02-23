<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CampaignController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin')->except(['index']);
    }
/*
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'target_amount' => 'required|numeric|min:0.01',
            'end_date' => 'required|date'
        ]);

        try {
            $campaign = Campaign::create([
                'admin_id' => auth('admin')->id(),
                'name' => $validated['name'],
                'description' => $validated['description'],
                'target_amount' => $validated['target_amount'],
                'end_date' => $validated['end_date']
            ]);

            return response()->json($campaign, 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Campaign creation failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
*/
public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string',
        'description' => 'required|string',
        'target_amount' => 'required|numeric',
        'end_date' => 'required|date',
    ]);

    // Convert date format
    $endDate = date('Y-m-d H:i:s', strtotime($request->end_date));

    $campaign = Campaign::create([
        'admin_id' => auth()->user()->id,  // Ensure authentication works
        'name' => $request->name,
        'description' => $request->description,
        'target_amount' => $request->target_amount,
        'end_date' => $endDate, // Store in correct format
    ]);

    return response()->json($campaign, 201);
}


    public function index()
    {
        try {
            return Campaign::with('admin')->latest()->get();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch campaigns',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}