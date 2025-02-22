<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CampaignController extends Controller
{
    public function store(Request $request)
    {
        logger()->info('Campaign Creation Attempt', $request->all());
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'target_amount' => 'required|numeric|min:0.01', // Minimum 1 cent
            'end_date' => 'required|date'
        ]);

        try {
            $campaign = Campaign::create([
                'user_id' => $request->user()->id,
                'name' => $validated['name'],
                'description' => $validated['description'],
                'target_amount' => $validated['target_amount'],
                'end_date' => $validated['end_date']
            ]);

            logger()->info('Campaign Created:', $campaign->toArray());
            return response()->json($campaign, 201);

        } catch (\Exception $e) {
            logger()->error('Campaign Creation Error:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Campaign creation failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        try {
            return Campaign::with('user')->latest()->get();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch campaigns',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}