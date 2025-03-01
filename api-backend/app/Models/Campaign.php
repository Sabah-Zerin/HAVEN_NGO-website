<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_id',
        'name',
        'description',
        'target_amount',
        'end_date'
    ];

    // app/Models/Campaign.php
    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }
}