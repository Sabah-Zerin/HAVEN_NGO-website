<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'target_amount',
        'end_date'
    ];

    protected $casts = [
        'end_date' => 'date',
        'target_amount' => 'float'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}