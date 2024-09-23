import { db } from "@/lib/db";

export const getUsers = async () => {
    try {
        const users = await db.user.findMany();

        return users;
    } catch (error: any) {
        throw new Error(`Failed to get users: ${error.message}`);
    }
};
