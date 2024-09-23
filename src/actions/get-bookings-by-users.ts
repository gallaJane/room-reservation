import { db } from "@/lib/db";

import { auth } from "@/auth";

export const getBookingsByUsers = async () => {


    try {
        const session = await auth();

        const bookings = await db.booking.findMany({
            where: {
                userId: session?.user.id
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
