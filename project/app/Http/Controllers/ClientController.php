<?php

namespace App\Http\Controllers;

use App\Models\Client; 
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        return response()->json(Client::all());
    }

    public function store(Request $request)
    {
        $client = Client::create($request->all());
        return response()->json($client, 201);
    }

    // Update an existing client
    public function update(Request $request, $id)
    {
         $client = Client::findOrFail($id);
         $client->update($request->all());
         return response()->json($client, 200);
    }

    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        $client->delete();
        return response()->json(null, 204);
    }
}
