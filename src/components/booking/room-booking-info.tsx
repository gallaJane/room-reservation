'use client';

import React from 'react';
import useBookRoom from '@/app/store/use-book-room.store';
import { useRouter } from 'next/navigation';

import Title, { TypeEnum } from '@/components/ui/title';
import { Button } from '@/components/ui/button';

import moment from 'moment';

const RoomBookingInfo = () => {
    const { bookingRoomData } = useBookRoom();
    const router = useRouter();

    const date = moment(bookingRoomData?.date).format('MMMM Do YYYY');

    const handleBookingInfo = () => {
        router.refresh();
        router.push('/my-bookings');
    };

    return (
        <div className="flex flex-col p-6 max-w-md mx-auto">
            <Title as="h5" type={TypeEnum.cardMain} className="text-center mb-4">Your Booking Summary</Title>
            <div className="mb-6 text-center text-gray-700">
                <div className="text-lg">Check-in Date: <span className="font-semibold text-gray-800">{date}</span></div>
                <div className="text-lg">Booking Hours: <span className="font-semibold text-gray-800">{bookingRoomData?.timeSlot}</span></div>
            </div>
            <Button onClick={handleBookingInfo} className='max-width-[150px]'>
                Check Your Bookings
            </Button>
        </div>
    );
}

export default RoomBookingInfo;
