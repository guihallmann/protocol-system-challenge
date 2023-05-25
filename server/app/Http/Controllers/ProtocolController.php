<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Protocol;
use App\Models\Person;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class ProtocolController extends Controller
{
    // GET ALL PROTOCOLS
    public function index()
    {
        return Protocol::all();
    }

    // CREATE PROTOCOL
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'description' => 'required|string',
            'deadline' => 'required|integer',
            'person_id' => 'required|exists:people,id',
        ]);

        $protocol = Protocol::create($validatedData);
        return response()->json(['message' => 'Protocol created successfully', 'data' => $protocol], Response::HTTP_CREATED);
    }

    // GET PROTOCOL BY ID
    public function show(string $id)
    {
        try {
            $protocol = Protocol::findOrFail($id);
            return response()->json(['data' => $protocol], Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Protocol not found'], Response::HTTP_NOT_FOUND);
        }
    }

    // UPDATE PROTOCOL
    public function update(Request $request, string $id)
    {
        try {
            $protocol = Protocol::findOrFail($id);
            $validatedData = $request->validate([
                'description' => 'string',
                'deadline' => 'integer',
                'person_id' => 'exists:people,id',
            ]);

            $protocol->update($validatedData);

            return response()->json(['message' => 'Protocol updated successfully', 'data' => $protocol], Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Protocol not found'], Response::HTTP_NOT_FOUND);
        }
    }

    // DELETE PROTOCOL
    public function destroy(string $id)
    {
        try {
            $protocol = Protocol::findOrFail($id);
            $protocol->delete();
            return response()->json(['message' => 'Protocol deleted successfully'], Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Protocol not found'], Response::HTTP_NOT_FOUND);
        }
    }

    // GET ALL PROTOCOL FROM PERSON
    // public function getPersonProtocols(string $personId)
    // {
    //     try {
    //         $person = Person::findOrFail($personId);
    //         $protocols = $person->protocols;
    //         return response()->json(['data' => $protocols], Response::HTTP_OK);
    //     } catch (ModelNotFoundException $e) {
    //         return response()->json(['error' => 'Person not found'], Response::HTTP_NOT_FOUND);
    //     }
    // }
    public function getPersonProtocols(string $personId)
    {
        try {
            $person = Person::with('protocols')->findOrFail($personId);
            return response()->json(['data' => $person], Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Person not found'], Response::HTTP_NOT_FOUND);
        }
    }


    // SEARCH PROTOCOLS BY CPF OR ID (NUMBER)
   public function searchProtocols(Request $request)
    {
        try {
            $searchText = $request->query('search');

            $protocols = Protocol::with('person')->where(function ($query) use ($searchText) {
                $query->whereHas('person', function ($query) use ($searchText) {
                    $query->where('cpf', 'LIKE', "%{$searchText}%");
                })->orWhere('id', 'LIKE', "%{$searchText}%");
            })->get();
            return response()->json(['data' => $protocols], Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Protocols not found'], Response::HTTP_NOT_FOUND);
        }
    }
}
