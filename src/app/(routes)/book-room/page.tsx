import React from 'react'
import RoomBookingInfo from '@/components/booking/room-booking-info'

const BookRoom = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <RoomBookingInfo />
            </div>
        </div>
    )
}

export default BookRoom