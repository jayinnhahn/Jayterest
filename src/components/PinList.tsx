'use client';
import React, { useState, useEffect } from 'react';
import { Pin } from '@prisma/client';
import PinItem from '@/components/PinItems';

export const fetchPins = () =>
	fetch('http://localhost:3000/api/pins').then((res) => res.json());

interface PinData {
	id: string;
	title: string;
	description: string;
	image: string;
	createdAt: Date;
}

export default function PinList() {
	const [pins, setPins] = useState<Pin[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const pinsData = await fetchPins();
				setPins(pinsData);
			} catch (error) {
				console.error('Error fetching pins:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<section className="mx-10 max-w-full">
			<div className="lg:columns-7 md:columns-5 sm:columns-3 columns-2 gap-3 mx-auto space-y-3">
				{pins.map((pin: PinData) => (
					<PinItem key={pin.id} data={pin} />
				))}
			</div>
		</section>
	);
}
