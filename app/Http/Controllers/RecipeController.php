<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RecipeController extends Controller
{
    public function index()
    {
        return Inertia::render('Recipes/Index', [
            'recipes' => Recipe::with('user:id,name')->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Recipes/Create');
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['user_id'] = $request->user()->id;

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('recipes', 'public');
        }
        unset($data['image']);

        Recipe::create($data);

        return redirect()->route('recipes.index')
            ->with('success', 'Recipe added successfully!');
    }

    public function show(Recipe $recipe)
    {
        return Inertia::render('Recipes/Show', [
            'recipe' => $recipe->load('user:id,name'),
        ]);
    }

    public function edit(Request $request, Recipe $recipe)
    {
        $this->checkOwner($request, $recipe);

        return Inertia::render('Recipes/Edit', [
            'recipe' => $recipe,
        ]);
    }

    public function update(Request $request, Recipe $recipe)
    {
        $this->checkOwner($request, $recipe);

        $data = $this->validated($request);

        if ($request->hasFile('image')) {
            if ($recipe->image_path) {
                Storage::disk('public')->delete($recipe->image_path);
            }
            $data['image_path'] = $request->file('image')->store('recipes', 'public');
        }
        unset($data['image']);

        $recipe->update($data);

        return redirect()->route('recipes.index')
            ->with('success', 'Recipe updated successfully!');
    }

    public function destroy(Request $request, Recipe $recipe)
    {
        $this->checkOwner($request, $recipe);

        if ($recipe->image_path) {
            Storage::disk('public')->delete($recipe->image_path);
        }

        $recipe->delete();

        return redirect()->route('recipes.index')
            ->with('success', 'Recipe deleted.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|in:Main Dish,Snack,Dessert,Drink,Other',
            'cook_time' => 'nullable|integer|min:1',
            'servings' => 'nullable|integer|min:1',
            'ingredients' => 'required|string',
            'steps' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);
    }

    private function checkOwner(Request $request, Recipe $recipe): void
    {
        abort_if($recipe->user_id !== $request->user()->id, 403);
    }
}