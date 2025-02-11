<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Client; 
use App\Models\Supplier;

class ClientSupplierSeeder extends Seeder
{
    public function run()
    {
        DB::table('clients')->truncate();
        DB::table('suppliers')->truncate();

        Client::create([
            'name' => 'Client Name',
            'email' => 'client@example.com',
            'phone' => '1234567890',
        ]);

        Supplier::create([
            'name' => 'Supplier Name',
            'email' => 'supplier@example.com',
            'phone' => '0987654321',
            'category' => 'Electronics',
        ]);
    }
}
