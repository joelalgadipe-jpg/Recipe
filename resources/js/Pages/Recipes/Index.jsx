import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

const categories = ['All', 'Main Dish', 'Snack', 'Dessert', 'Drink', 'Other'];

const badge = {
    'Main Dish': 'bg-orange-100 text-orange-700',
    Snack: 'bg-yellow-100 text-yellow-700',
    Dessert: 'bg-pink-100 text-pink-700',
    Drink: 'bg-sky-100 text-sky-700',
    Other: 'bg-stone-100 text-stone-700',
};

export default function Index({ recipes }) {
    const { auth } = usePage().props;
    const [active, setActive] = useState('All');
    const [search, setSearch] = useState('');

    const filtered = recipes.filter(
        (recipe) =>
            (active === 'All' || recipe.category === active) &&
            recipe.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this recipe?')) {
            router.delete(route('recipes.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="font-serif text-2xl font-bold text-stone-900">Recipes</h2>
                        <p className="mt-1 text-sm text-stone-500">
                            {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} in the collection
                        </p>
                    </div>
                    <Link
                        href={route('recipes.create')}
                        className="rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
                    >
                        + Add Recipe
                    </Link>
                </div>
            }
        >
            <Head title="Recipes" />

            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-8 space-y-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search recipes..."
                        className="w-full rounded-lg border-stone-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />

                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActive(category)}
                                className={
                                    'rounded-full px-4 py-1.5 text-sm font-medium transition ' +
                                    (active === category
                                        ? 'bg-orange-600 text-white'
                                        : 'bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-stone-100')
                                }
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {filtered.length === 0 && (
                    <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-stone-200">
                        <div className="text-5xl">🍽️</div>
                        <h3 className="mt-4 text-lg font-bold text-stone-900">No recipes found</h3>
                        <p className="mt-1 text-stone-500">Try a different search, or add your first recipe.</p>
                    </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 transition hover:shadow-md"
                        >
                            <Link href={route('recipes.show', recipe.id)}>
                                {recipe.image_path ? (
                                    <img
                                        src={`/storage/${recipe.image_path}`}
                                        alt={recipe.title}
                                        className="h-48 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 text-5xl">
                                        🍽️
                                    </div>
                                )}
                            </Link>

                            <div className="flex flex-1 flex-col p-6">
                                <span
                                    className={
                                        'w-fit rounded-full px-3 py-1 text-xs font-semibold ' +
                                        (badge[recipe.category] ?? badge.Other)
                                    }
                                >
                                    {recipe.category}
                                </span>

                                <h3 className="mt-4 font-serif text-xl font-bold text-stone-900">
                                    {recipe.title}
                                </h3>

                                <div className="mt-3 flex flex-wrap gap-4 text-sm text-stone-500">
                                    {recipe.cook_time && <span>⏱ {recipe.cook_time} min</span>}
                                    {recipe.servings && <span>🍽 {recipe.servings} servings</span>}
                                </div>

                                <p className="mt-2 text-sm text-stone-500">By {recipe.user?.name}</p>

                                <div className="mt-auto flex items-center gap-4 border-t border-stone-100 pt-4 text-sm">
                                    <Link
                                        href={route('recipes.show', recipe.id)}
                                        className="font-semibold text-orange-600 hover:underline"
                                    >
                                        View Recipe
                                    </Link>

                                    {auth.user.id === recipe.user_id && (
                                        <>
                                            <Link
                                                href={route('recipes.edit', recipe.id)}
                                                className="font-medium text-stone-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(recipe.id)}
                                                className="font-medium text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}