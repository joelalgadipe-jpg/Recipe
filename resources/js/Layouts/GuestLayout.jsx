import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-stone-50 px-4 py-10">
            <Link href="/" className="flex items-center gap-2">
                <span className="text-4xl">🍳</span>
                <span className="font-serif text-3xl font-bold text-stone-900">Recipe Book</span>
            </Link>
            <p className="mt-2 text-sm text-stone-500">Your personal cookbook</p>

            <div className="mt-8 w-full overflow-hidden rounded-2xl bg-white px-8 py-8 shadow-sm ring-1 ring-stone-200 sm:max-w-md">
                {children}
            </div>
        </div>
    );
}