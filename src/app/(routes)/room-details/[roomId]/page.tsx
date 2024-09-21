import { getRoomById } from '@/actions/get-room-byId';
import React from 'react'

import RoomDetailsClient from '@/components/room/room-details-client';

export type RoomDetailsPageProps = {
    params: {
        roomId: string
    }
}

const RoomDetails = async ({ params }: RoomDetailsPageProps) => {
    const room = await getRoomById(params.roomId);

    if (!room) return <div>...Room not found...</div>
    return (
        <div>
            <RoomDetailsClient room={room} />
        </div>
    )
}

export default RoomDetails;