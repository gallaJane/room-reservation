import React from 'react'

import Title from '@/components/ui/title';
import RoomList from '@/components/room/room-list';

import { getRooms } from "@/actions/get-rooms";


const AllRooms = async () => {
    const rooms = await getRooms();

    if (!rooms) return <>No rooms found!</>
    return (
        <div>
            <Title as='h5'> All rooms</Title>
            <RoomList rooms={rooms} />
        </div>
    )
}

export default AllRooms;