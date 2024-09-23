'use client';

import RoomAmenities from '@/components/room/room-amenities';
import Title, { TypeEnum } from '@/components/ui/title';

import { Booking, Room } from '@prisma/client';

export type MyBookingsClientProps = {
    booking: Booking & { room: Room | null }
}

const MyBookingsClient = ({ booking }: MyBookingsClientProps) => {
    const { room } = booking;

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <Title>
                    {room?.name}
                </Title>
                <div className="mt-4">
                    <Title as="h3" type={TypeEnum.card}>
                        Room Amenities
                    </Title>
                    <RoomAmenities amenities={room?.amenities} />
                </div>
            </div>

        </div>
    );
};

export default MyBookingsClient;