import { getRoomById } from '@/actions/get-room-byId';
import React from 'react'

import RoomDetailsClient from '@/components/room/room-details-client';
import { getBookings } from '@/actions/get-bookings';

export type RoomDetailsPageProps = {
    params: {
        roomId: string
    }
}

const RoomDetails = async ({ params }: RoomDetailsPageProps) => {
    const room = await getRoomById(params.roomId);
    if (!room) return <div>Room not found!</div>


    const bookings = await getBookings(room.id)

    if (!room) return <div>...Room not found...</div>
    return (
        <div>
            <RoomDetailsClient room={room} bookings={bookings} />
        </div>
    )
}

export default RoomDetails;