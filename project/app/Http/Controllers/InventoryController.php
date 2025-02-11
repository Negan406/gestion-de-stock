<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index()
    {
        return response()->json(Inventory::all());
    }

    public function store(Request $request)
    {
            $data = $request->all();
            $data['value'] = $data['price'] * $data['quantity'];
            $inventory = Inventory::create($data);
            return response()->json($inventory, 201);
    } 
       
    // Update an existing inventory item
    public function update(Request $request, $id)
    {
        $inventory = Inventory::findOrFail($id);
        $data = $request->all();
        if (isset($data['price']) && isset($data['quantity'])) {
            $data['value'] = $data['price'] * $data['quantity'];
        }
        $inventory->update($data);
        return response()->json($inventory, 200);
    }

    public function destroy($id)
    {
        $inventory = Inventory::findOrFail($id);
        $inventory->delete();
        return response()->json(null, 204);
    }
}