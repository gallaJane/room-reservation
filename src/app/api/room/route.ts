import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const room = await db.room.create({
            data: {
                ...body,
            }
        });

        return NextResponse.json(room);

    } catch (error: any) {
        const errMsg = 'Problem loading';
        if (error.response) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error(errMsg);
        }
    }
}
