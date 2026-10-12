import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const badge = {
    'Main Dish': 'bg-orange-100 text-orange-700',
    Snack: 'bg-yellow-100 text-yellow-700',
    Dessert: 'bg-pink-100 text-pink-700',
    Drink: 'bg-sky-100 text-sky-700',
    Other: 'bg-stone-100 text-stone-700',
};

export default function Show({ recipe }) {
    const ingredients = recipe.ingredients.split('\n').filter((line) => line.trim() !== '');
    const steps = recipe.steps.split('\n').filter((line) => line.trim() !== '');
    const badgeClass = badge[recipe.category] ? badge[recipe.category] : badge.Other;
    const cookTime = recipe.cook_time ? recipe.cook_time + ' min' : 'N/A';
    const servings = recipe.servings ? recipe.servings : 'N/A';
    const author = recipe.user ? recipe.user.name : 'Unknown';

    const ingredientItems = ingredients.map((item, index) => <li key={index} className="flex items-start gap-3 text-stone-700"><span className="mt-2 h-2 w-2 flex-none rounded-full bg-orange-500"></span>{item}</li>);

    const stepItems = steps.map((step, index) => <li key={index} className="flex gap-4 text-stone-700"><span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">{index + 1}</span><p className="pt-1">{step}</p></li>);

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <span className={'rounded-full px-3 py-1 text-xs font-semibold ' + badgeClass}>
                        {recipe.category}
                    </span>
                    <h2 className="mt-3 font-serif text-3xl font-bold text-stone-900">{recipe.title}</h2>
                    <p className="mt-1 text-sm text-stone-500">By {author}</p>
                </div>
            }
        >
            <Head title={recipe.title} />

            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                <Link
                    href={route('recipes.index')}
                    className="mb-4 inline-block text-sm font-semibold text-stone-600 hover:underline"
                >
                    ← Back to recipes
                </Link>

                {recipe.image_path && (
                    <img
                        src={'/storage/' + recipe.image_path}
                        alt={recipe.title}
                        className="mb-6 h-72 w-full rounded-2xl object-cover shadow-sm ring-1 ring-stone-200 sm:h-96"
                    />
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-stone-200">
                        <div className="text-2xl">⏱</div>
                        <p className="mt-1 text-sm text-stone-500">Cooking Time</p>
                        <p className="font-bold text-stone-900">{cookTime}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-stone-200">
                        <div className="text-2xl">🍽</div>
                        <p className="mt-1 text-sm text-stone-500">Servings</p>
                        <p className="font-bold text-stone-900">{servings}</p>
                    </div>
                </div>

                <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
                    <h3 className="font-serif text-xl font-bold text-stone-900">Ingredients</h3>
                    <ul className="mt-4 space-y-2">{ingredientItems}</ul>
                </div>

                <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
                    <h3 className="font-serif text-xl font-bold text-stone-900">Instructions</h3>
                    <ol className="mt-4 space-y-4">{stepItems}</ol>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}