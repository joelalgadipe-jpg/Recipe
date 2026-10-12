import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RecipeForm from '@/Components/RecipeForm';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: 'Main Dish',
        cook_time: '',
        servings: '',
        ingredients: '',
        steps: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('recipes.store'), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-serif text-2xl font-bold text-stone-900">Add a New Recipe</h2>}
        >
            <Head title="Add Recipe" />

            <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
                <Link
                    href={route('recipes.index')}
                    className="mb-4 inline-block text-sm font-semibold text-stone-600 hover:underline"
                >
                    ← Back to recipes
                </Link>

                <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
                    <RecipeForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={submit}
                        submitLabel="Save Recipe"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}