import { db } from "@/lib/db";

export const getRooms = async (search: string) => {
    try {
        const rooms = await db.room.findMany({
            where: {
                name: {
                    contains: search
                },
            }
        });
        return rooms;
    } catch (error: any) {
        throw new Error(error);
    }
};
