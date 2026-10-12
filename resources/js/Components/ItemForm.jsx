import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ItemForm({ data, setData, errors, processing, onSubmit, submitLabel }) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div>
                <InputLabel htmlFor="type" value="Type" />
                <select
                    id="type"
                    value={data.type}
                    onChange={(e) => setData('type', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="lost">Lost (nawala)</option>
                    <option value="found">Found (nakita)</option>
                </select>
                <InputError message={errors.type} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="title" value="Pangalan ng gamit" />
                <TextInput
                    id="title"
                    className="mt-1 block w-full"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                />
                <InputError message={errors.title} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    rows="4"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="location" value="Lokasyon" />
                <TextInput
                    id="location"
                    className="mt-1 block w-full"
                    value={data.location}
                    onChange={(e) => setData('location', e.target.value)}
                />
                <InputError message={errors.location} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="date_happened" value="Petsa" />
                <TextInput
                    id="date_happened"
                    type="date"
                    className="mt-1 block w-full"
                    value={data.date_happened}
                    onChange={(e) => setData('date_happened', e.target.value)}
                />
                <InputError message={errors.date_happened} className="mt-2" />
            </div>

            <PrimaryButton disabled={processing}>{submitLabel}</PrimaryButton>
        </form>
    );
}