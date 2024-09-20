
import { Room } from '@prisma/client';
import React from 'react'
import RoomCard from '@/components/room/room-card';

const RoomList = ({ rooms }: { rooms: Room[] }) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cold-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4'>
            {rooms.map((room) => (
                <div key={room.id}>
                    <RoomCard
                        room={room}
                    />
                </div>

            ))}
        </div>
    )
}

export default RoomList;