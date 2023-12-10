'use client';
import useSWR, { mutate } from 'swr';
import { useState, FormEvent } from 'react';
const PinCreateCard = () => {
	const [title, setTitle] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [description, setDescription] = useState('');

	const fetcher = (url: string) => fetch(url).then((res) => res.json());
	const { data: pins } = useSWR('/api/pins', fetcher);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = {
			title,
			imageUrl,
			description,
		};

		try {
			const response = await fetch('/api/pins', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				console.log('Pin added successfully');
				mutate('/api/pins');
			} else {
				console.error('Failed to add pin:', response.statusText);
			}
		} catch (error) {
			throw error;
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="rounded-xl border-2 border-black p-10 w-full mx-20"
		>
			<div className="my-10">
				<label className="block mb-2 text-[1.5rem] font-medium text-gray-900 dark:text-white">
					Title
				</label>
				<input
					type="text"
					id="title"
					value={title}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					placeholder="Add a title"
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
			</div>
			<div className="my-10">
				<label className="block mb-2 text-[1.5rem] font-medium text-gray-900 dark:text-white">
					Image Url
				</label>
				<input
					type="text"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					placeholder="Add a link of the image you are going to use"
					id="imageUrl"
					value={imageUrl}
					onChange={(e) => setImageUrl(e.target.value)}
					required
				/>
			</div>
			<div className="my-10">
				<label className="block mb-2 text-[1.5rem] font-medium text-gray-900 dark:text-white">
					Description
				</label>
				<input
					type="text"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 pb-20"
					placeholder="Add a detailed description"
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
			</div>
			<div className="flex justify-end">
				<button
					type="submit"
					className="text-white px-4 py-2 rounded-3xl bg-primaryblue font-bold"
				>
					Submit
				</button>
			</div>
		</form>
	);
};

export default PinCreateCard;
