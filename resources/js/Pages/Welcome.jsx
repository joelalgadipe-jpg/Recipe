import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const features = [
        {
            icon: '📖',
            title: 'Organize your recipes',
            text: 'Keep all your favorite dishes in one place, with ingredients and step-by-step instructions.',
        },
        {
            icon: '🔎',
            title: 'Find them instantly',
            text: 'Search by name or filter by category to find exactly what you want to cook.',
        },
        {
            icon: '🤝',
            title: 'Share with others',
            text: 'Browse recipes posted by other cooks and get inspired for your next meal.',
        },
    ];

    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen bg-stone-50 text-stone-800">
                <header className="border-b border-stone-200 bg-white">
                    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🍳</span>
                            <span className="font-serif text-xl font-bold text-stone-900">Recipe Book</span>
                        </div>

                        <nav className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={route('recipes.index')}
                                    className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
                                >
                                    Go to Recipes
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <section className="bg-gradient-to-b from-orange-50 to-stone-50">
                    <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
                        <span className="rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700">
                            Your personal cookbook
                        </span>
                        <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-stone-900 sm:text-6xl">
                            Cook better with everything in one place
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-600">
                            Save your favorite recipes, discover new dishes, and keep every ingredient and
                            step organized and easy to follow.
                        </p>
                        <div className="mt-10 flex justify-center gap-4">
                            <Link
                                href={auth.user ? route('recipes.index') : route('register')}
                                className="rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-orange-700"
                            >
                                {auth.user ? 'Browse Recipes' : 'Create a Free Account'}
                            </Link>
                            {!auth.user && (
                                <Link
                                    href={route('login')}
                                    className="rounded-lg border border-stone-300 bg-white px-6 py-3 font-semibold text-stone-700 hover:bg-stone-50"
                                >
                                    Log in
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-3">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-200"
                            >
                                <div className="text-4xl">{feature.icon}</div>
                                <h3 className="mt-4 text-lg font-bold text-stone-900">{feature.title}</h3>
                                <p className="mt-2 text-stone-600">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="border-t border-stone-200 bg-white py-6 text-center text-sm text-stone-500">
                    © {new Date().getFullYear()} Recipe Book. All rights reserved.
                </footer>
            </div>
        </>
    );
}