import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={<h2 className="font-serif text-2xl font-bold text-stone-900">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white shadow-sm">
                    <h3 className="font-serif text-3xl font-bold">Welcome back, {auth.user.name}! 👋</h3>
                    <p className="mt-2 text-orange-50">What would you like to cook today?</p>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <Link
                        href={route('recipes.index')}
                        className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-200 transition hover:shadow-md"
                    >
                        <div className="text-3xl">📚</div>
                        <h4 className="mt-3 text-lg font-bold text-stone-900">Browse Recipes</h4>
                        <p className="mt-1 text-stone-600">Explore all recipes from the community.</p>
                    </Link>

                    <Link
                        href={route('recipes.create')}
                        className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-200 transition hover:shadow-md"
                    >
                        <div className="text-3xl">✍️</div>
                        <h4 className="mt-3 text-lg font-bold text-stone-900">Add a Recipe</h4>
                        <p className="mt-1 text-stone-600">Share your own favorite dish.</p>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}