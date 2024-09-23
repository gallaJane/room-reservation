'use client'

import React, { useState, useEffect } from 'react';

export type RoomAmenitiesProps = {
    amenities: string[] | undefined;
}

const RoomAmenities = ({ amenities }: RoomAmenitiesProps) => {

    const [bgColor, setBgColor] = useState<string>('');

    useEffect(() => {
        setBgColor(getRandomPastelColor());
    }, []);

    const getRandomPastelColor = () => {
        const randomColor = () => Math.floor(Math.random() * 256);
        return `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 0.3)`;
    };

    return (
        <div className="pt-6 pb-6 rounded-lg shadow-md" style={{ backgroundColor: bgColor }}>
            <div className="grid grid-cols-2 gap-6 px-4">
                {amenities?.map((amenity, index) => (
                    <div key={index} className="flex items-center bg-white p-2 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <span className="flex h-3 w-3 rounded-full bg-sky-500 mr-3" />
                        <p className="text-base text-gray-800">{amenity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RoomAmenities;
