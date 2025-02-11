<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $table = 'inventories';
    protected $fillable = ['name', 'category', 'price', 'quantity', 'value'];

    // Automatically cast these attributes to their proper types
    protected $casts = [
       'price' => 'float',
       'quantity' => 'integer',
       'value' => 'float',
    ];
}
