import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// UPDATE ROOM
export async function PATCH(
    req: Request,
    { params }: {
        params: { roomId: string }
    }) {
    try {

        const body = await req.json();
        if (!params.roomId) {
            return new NextResponse(' Room Id is requred!')
        }

        const room = await db.room.update({
            where: {
                id: params.roomId
            },
            data: {
                ...body
            }
        })

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

// DELETE ROOM
export async function DELETE(
    req: Request,
    { params }: {
        params: { roomId: string }
    }) {
    try {
        if (!params.roomId) {
            return new NextResponse(' Room Id is requred!')
        }

        const room = await db.room.delete({
            where: {
                id: params.roomId
            }
        })

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