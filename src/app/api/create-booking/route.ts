import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { booking } = body

        if (!booking || !booking.userId || !booking.roomId || !booking.date || !booking.timeSlot) {
            return NextResponse.json({ error: "Missing booking data" }, { status: 400 })
        }

        const existingBooking = await db.booking.findFirst({
            where: {
                userId: booking.userId,
                roomId: booking.roomId,
                date: new Date(booking.date),
                timeSlot: booking.timeSlot,
            },
        })

        if (existingBooking) {
            return NextResponse.json({ error: "Booking for this room and time already exists." }, { status: 400 })
        }

        const newBooking = await db.booking.create({
            data: {
                userId: booking.userId,
                roomId: booking.roomId,
                date: new Date(booking.date),
                timeSlot: booking.timeSlot,
            },
        })

        return NextResponse.json(newBooking, { status: 201 })
    } catch (error) {
        console.error('Error creating booking:', error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
