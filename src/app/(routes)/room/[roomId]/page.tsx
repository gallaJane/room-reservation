import React from 'react'

import { getRoomById } from '@/actions/get-room-byId';
import AddRoomForm from '@/components/room/add-room-form';

export type RoomPageProps = {
    params: {
        roomId: string
    }
}

const Room = async ({ params }: RoomPageProps) => {
    const room = await getRoomById(params.roomId);

    return (
        <div>
            <AddRoomForm room={room} />
        </div>
    )

}

export default Room;