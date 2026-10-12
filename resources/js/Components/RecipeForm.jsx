import { useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function RecipeForm({
    data,
    setData,
    errors,
    processing,
    onSubmit,
    submitLabel,
    existingImage,
}) {
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!data.image) {
            setPreview(null);
            return;
        }
        const url = URL.createObjectURL(data.image);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [data.image]);

    const shownImage = preview ?? (existingImage ? `/storage/${existingImage}` : null);

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div>
                <InputLabel htmlFor="title" value="Recipe Title" />
                <TextInput
                    id="title"
                    className="mt-1 block w-full"
                    placeholder="e.g. Chicken Adobo"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                />
                <InputError message={errors.title} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="image" value="Photo (optional, max 2 MB)" />
                {shownImage && (
                    <img
                        src={shownImage}
                        alt="Recipe preview"
                        className="mt-2 h-48 w-full rounded-xl object-cover ring-1 ring-stone-200"
                    />
                )}
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setData('image', e.target.files[0] ?? null)}
                    className="mt-3 block w-full text-sm text-stone-600 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-orange-700 hover:file:bg-orange-100"
                />
                <InputError message={errors.image} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="category" value="Category" />
                <select
                    id="category"
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                    className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                    <option value="Main Dish">Main Dish</option>
                    <option value="Snack">Snack</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Drink">Drink</option>
                    <option value="Other">Other</option>
                </select>
                <InputError message={errors.category} className="mt-2" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel htmlFor="cook_time" value="Cooking Time (minutes)" />
                    <TextInput
                        id="cook_time"
                        type="number"
                        min="1"
                        className="mt-1 block w-full"
                        placeholder="e.g. 45"
                        value={data.cook_time}
                        onChange={(e) => setData('cook_time', e.target.value)}
                    />
                    <InputError message={errors.cook_time} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="servings" value="Servings" />
                    <TextInput
                        id="servings"
                        type="number"
                        min="1"
                        className="mt-1 block w-full"
                        placeholder="e.g. 4"
                        value={data.servings}
                        onChange={(e) => setData('servings', e.target.value)}
                    />
                    <InputError message={errors.servings} className="mt-2" />
                </div>
            </div>

            <div>
                <InputLabel htmlFor="ingredients" value="Ingredients (one per line)" />
                <textarea
                    id="ingredients"
                    rows="6"
                    placeholder={'1 kg chicken\n1/2 cup soy sauce\n1/4 cup vinegar'}
                    value={data.ingredients}
                    onChange={(e) => setData('ingredients', e.target.value)}
                    className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
                <InputError message={errors.ingredients} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="steps" value="Instructions (one step per line)" />
                <textarea
                    id="steps"
                    rows="6"
                    placeholder={'Marinate the chicken.\nSimmer for 30 minutes.\nServe hot with rice.'}
                    value={data.steps}
                    onChange={(e) => setData('steps', e.target.value)}
                    className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
                <InputError message={errors.steps} className="mt-2" />
            </div>

            <button
                type="submit"
                disabled={processing}
                className="rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 disabled:opacity-50"
            >
                {submitLabel}
            </button>
        </form>
    );
}