import { db } from "@/lib/db";

export const getRooms = async (search: string) => {
    try {
        debugger;

        const rooms = await db.room.findMany({
            where: {
                name: {
                    contains: search
                },
            }
        });
        console.log(rooms);
        return rooms;
    } catch (error: any) {
        throw new Error(error);
    }
};
