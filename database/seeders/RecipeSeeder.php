<?php

namespace Database\Seeders;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RecipeSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'chef@recipebook.test'],
            [
                'name' => 'Chef Demo',
                'password' => Hash::make('password'),
            ]
        );

        $recipes = [
            [
                'title' => 'Chicken Adobo',
                'category' => 'Main Dish',
                'cook_time' => 50,
                'servings' => 4,
                'ingredients' => "1 kg chicken, cut into pieces\n1/2 cup soy sauce\n1/3 cup vinegar\n1 head garlic, crushed\n3 bay leaves\n1 tsp whole peppercorns\n1 cup water",
                'steps' => "Combine chicken, soy sauce, vinegar, garlic, bay leaves, and peppercorns in a pot.\nMarinate for at least 30 minutes.\nAdd water and bring to a boil.\nSimmer for 30 minutes until the chicken is tender.\nServe hot with steamed rice.",
            ],
            [
                'title' => 'Pork Sinigang',
                'category' => 'Main Dish',
                'cook_time' => 75,
                'servings' => 5,
                'ingredients' => "1 kg pork ribs\n1 packet sinigang mix\n2 tomatoes, quartered\n1 onion, sliced\n1 bundle kangkong\n6 pieces string beans\n2 long green peppers\n8 cups water",
                'steps' => "Boil the pork in water with onion and tomatoes until tender.\nStir in the sinigang mix.\nAdd string beans and simmer for 5 minutes.\nAdd the green peppers and kangkong.\nSeason with fish sauce and serve hot.",
            ],
            [
                'title' => 'Banana Cue',
                'category' => 'Snack',
                'cook_time' => 20,
                'servings' => 6,
                'ingredients' => "6 saba bananas, peeled\n1 cup brown sugar\n2 cups cooking oil\nBamboo skewers",
                'steps' => "Heat the oil in a pan over medium heat.\nFry the bananas until golden.\nSprinkle brown sugar and let it caramelize.\nSkewer the bananas and let them cool slightly.\nServe warm.",
            ],
            [
                'title' => 'Leche Flan',
                'category' => 'Dessert',
                'cook_time' => 90,
                'servings' => 8,
                'ingredients' => "10 egg yolks\n1 can condensed milk\n1 can evaporated milk\n1 tsp vanilla extract\n1/2 cup sugar for caramel",
                'steps' => "Melt the sugar in a llanera until it turns golden brown.\nMix egg yolks, condensed milk, evaporated milk, and vanilla.\nStrain the mixture into the llanera.\nCover with foil and steam for 45 minutes.\nChill before serving.",
            ],
            [
                'title' => "Sago't Gulaman",
                'category' => 'Drink',
                'cook_time' => 30,
                'servings' => 6,
                'ingredients' => "1 cup brown sugar\n1/2 cup tapioca pearls\n1 cup gulaman, cubed\n1 tsp vanilla extract\n6 cups water\nIce",
                'steps' => "Boil water with brown sugar until dissolved to make a syrup.\nCook the tapioca pearls until soft and translucent.\nAdd the gulaman cubes and vanilla to the syrup.\nChill in the refrigerator.\nServe over ice.",
            ],
            [
                'title' => 'Pancit Canton',
                'category' => 'Main Dish',
                'cook_time' => 35,
                'servings' => 4,
                'ingredients' => "250 g pancit canton noodles\n200 g chicken breast, sliced\n1 carrot, julienned\n1 cup cabbage, shredded\n3 cloves garlic\n1 onion, sliced\n3 tbsp soy sauce\n2 cups chicken broth",
                'steps' => "Saute garlic and onion in a large pan.\nAdd the chicken and cook until golden.\nAdd carrot and cabbage, then stir-fry for 2 minutes.\nPour in the broth and soy sauce, then bring to a boil.\nAdd the noodles and toss until the liquid is absorbed.\nServe with calamansi.",
            ],
        ];

        foreach ($recipes as $recipe) {
            Recipe::firstOrCreate(
                ['title' => $recipe['title']],
                $recipe + ['user_id' => $user->id]
            );
        }
    }
}