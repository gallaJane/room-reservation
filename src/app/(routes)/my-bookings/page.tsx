import React from 'react'
import { getBookingsByAdmin } from '@/actions/get-bookings-by-admin'
import { getBookingsByUsers } from '@/actions/get-bookings-by-users'
import { auth } from "@/auth";

import MyBookingsClient from '@/components/booking/my-bookings-client'
import Title from '@/components/ui/title'


const MyBookings = async () => {
    const bookingsByAdmin = await getBookingsByAdmin();
    const bookingsByUsers = await getBookingsByUsers();

    const session = await auth();

    if (!bookingsByAdmin && !bookingsByUsers) return <div>No bookings found.</div>
    return (

        <div className="flex flex-col gap-10">
            {!!bookingsByAdmin?.length && session?.user.role === 'ADMIN' && (
                <div>
                    <Title>Bookings you have booked</Title>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {bookingsByAdmin.map((booking) => (
                            <MyBookingsClient key={booking.id} booking={booking} />
                        ))}
                    </div>
                </div>
            )}

            {!!bookingsByUsers?.length && (
                <div>
                    <Title>Bookings</Title>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {bookingsByUsers.map((booking) => (
                            <MyBookingsClient key={booking.id} booking={booking} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyBookings