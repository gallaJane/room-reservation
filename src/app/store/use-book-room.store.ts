import { Room } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'

type BookRoomProps = {
    bookingRoomData: RoomDataType | null;
    setRoomData: (data: RoomDataType) => void;
    resetBookRoom: () => void;
}

type RoomDataType = {
    room: Room,
    date: Date,
    timeSlot: string
}

const useBookRoom = create<BookRoomProps>()(
    persist((set) => ({
        bookingRoomData: null,
        setRoomData: (data: RoomDataType) => set(
            { bookingRoomData: data }),
        resetBookRoom: () => set(
            { bookingRoomData: null }),
    }),
        {
            name: 'BookRoom'
        }
    )
);

export default useBookRoom;