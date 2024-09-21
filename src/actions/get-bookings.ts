import { db } from "@/lib/db";

export const getBookings = async (roomId: string) => {
    try {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)

        const bookings = await db.booking.findMany({
            where: {
                roomId,
                date: {
                    gt: yesterday
                }
            }
        })

        return bookings;
    } catch (error: any) {
        throw new Error(error);
    }
};
