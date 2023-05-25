<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Person;
use App\Models\Protocol;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PersonController extends Controller
{
    // GET ALL PEOPLE
    public function index()
    {
        return Person::all();
    }

    // CREATE PERSON
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'birthday' => 'required|date',
            'cpf' => 'required|string|unique:people,cpf',
            'sex' => 'required|in:Masculino,Feminino,Outro',
            'city' => 'nullable|string',
            'neighborhood' => 'nullable|string',
            'street' => 'nullable|string',
            'number' => 'nullable|string',
            'complement' => 'nullable|string',
        ]);

        $person = Person::create($validatedData);

        return response()->json(['message' => 'Person created successfully', 'data' => $person], 201);
    }

    // GET PERSON BY ID
    public function show(string $id)
    {
        try {
            $person = Person::findOrFail($id);
            return response()->json(['data' => $person], Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Person not found'], Response::HTTP_NOT_FOUND);
        }
    }

    // UPDATE PERSON
    public function update(Request $request, string $id)
    {
        try {
            $person = Person::findOrFail($id);

            $validatedData = $request->validate([
                'name' => 'string',
                'birthday' => 'date',
                'cpf' => 'unique:people,cpf,' . $person->id,
                'sex' => 'in:Masculino,Feminino,Outro',
                'city' => 'nullable|string',
                'neighborhood' => 'nullable|string',
                'street' => 'nullable|string',
                'number' => 'nullable|string',
                'complement' => 'nullable|string',
            ]);

            $person->update($validatedData);

            return response()->json(['message' => 'Person updated successfully', 'data' => $person], Response::HTTP_OK);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Person not found'], Response::HTTP_NOT_FOUND);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], Response::HTTP_BAD_REQUEST);
        }
    }

    // DELETE PERSON
    public function destroy(string $id)
    {
        try {
            $person = Person::findOrFail($id);
            $person->delete();
            return response()->json(['message' => 'Person deleted successfully'], Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Person not found'], Response::HTTP_NOT_FOUND);
        }
    }

    // SEARCH PERSON BY NAME OR CPF
    public function search(Request $request)
    {
        try {
            $searchText = $request->query('search');
            $persons = Person::where(function ($query) use ($searchText) {
                $query->where('name', 'LIKE', "%{$searchText}%")->orWhere('cpf', 'LIKE', "%{$searchText}%");
            })->get();
            return response()->json(['data' => $persons], Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Person not found'], Response::HTTP_NOT_FOUND);
        }
        
    }
}
