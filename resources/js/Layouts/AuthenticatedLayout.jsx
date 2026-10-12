import { useEffect, useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;
    const [open, setOpen] = useState(false);
    const [showFlash, setShowFlash] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const navLink = (active) =>
        'rounded-md px-3 py-2 text-sm font-medium transition ' +
        (active
            ? 'bg-orange-50 text-orange-700'
            : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900');

    return (
        <div className="flex min-h-screen flex-col bg-stone-50">
            {showFlash && flash?.success && (
                <div className="fixed right-4 top-20 z-30 flex items-center gap-3 rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white shadow-lg">
                    <span>✓</span>
                    <span>{flash.success}</span>
                    <button
                        onClick={() => setShowFlash(false)}
                        className="ml-2 text-green-100 hover:text-white"
                    >
                        ✕
                    </button>
                </div>
            )}

            <nav className="sticky top-0 z-20 border-b border-stone-200 bg-white/90 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-8">
                        <Link href={route('recipes.index')} className="flex items-center gap-2">
                            <span className="text-2xl">🍳</span>
                            <span className="font-serif text-xl font-bold text-stone-900">
                                Recipe Book
                            </span>
                        </Link>

                        <div className="hidden items-center gap-1 sm:flex">
                            <Link href={route('dashboard')} className={navLink(route().current('dashboard'))}>
                                Dashboard
                            </Link>
                            <Link href={route('recipes.index')} className={navLink(route().current('recipes.*'))}>
                                Recipes
                            </Link>
                        </div>
                    </div>

                    <div className="hidden sm:block">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
                                >
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                    {user.name}
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                    <button
                        onClick={() => setOpen(!open)}
                        className="rounded-md p-2 text-stone-600 hover:bg-stone-100 sm:hidden"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {open ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {open && (
                    <div className="border-t border-stone-200 sm:hidden">
                        <div className="space-y-1 pb-3 pt-2">
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('recipes.index')} active={route().current('recipes.*')}>
                                Recipes
                            </ResponsiveNavLink>
                        </div>
                        <div className="border-t border-stone-200 pb-3 pt-4">
                            <div className="px-4">
                                <div className="text-base font-medium text-stone-800">{user.name}</div>
                                <div className="text-sm text-stone-500">{user.email}</div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {header && (
                <header className="border-b border-stone-200 bg-white">
                    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main className="flex-1">{children}</main>

            <footer className="border-t border-stone-200 bg-white py-6 text-center text-sm text-stone-500">
                © {new Date().getFullYear()} Recipe Book. All rights reserved.
            </footer>
        </div>
    );
}