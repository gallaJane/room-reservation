import { db } from "@/lib/db";

export const getRoomById = async (roomId: string) => {
    try {
        // Check if roomId is a valid ObjectId string
        // because of @id @default(auto()) @map("_id") @db.ObjectId in schema
        if (!/^[0-9a-fA-F]{24}$/.test(roomId)) {
            return null;
        }

        const room = await db.room.findUnique({
            where: {
                id: roomId,
            },
        });
        if (!room) return null;
        return room;
    } catch (error: any) {
        throw new Error(error);
    }
};