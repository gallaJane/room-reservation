import { db } from "@/lib/db";

import { auth } from "@/auth";

export const getBookingsByAdmin = async () => {


    try {
        const session = await auth();

        if (!session?.user.id) {
            throw new Error('Unauthorized')
        }


        const bookings = await db.booking.findMany({
            where: {
                user: {
                    role: 'ADMIN'
                }
            },
            include: {
                room: true
            },
            orderBy: {
                date: 'desc'
            }
        })

        if (!bookings) return null;
        return bookings;

    } catch (error: any) {
        throw new Error(error);
    }
};
