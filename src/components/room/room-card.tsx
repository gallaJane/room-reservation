'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Room } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'

import RoomAmenities from '@/components/room/room-amenities';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from '@/components/ui/button'


const RoomCard = ({ room }: { room: Room }) => {
    const pathName = usePathname()
    const isMyRooms = pathName.includes('my-rooms')
    const router = useRouter()

    return (
        <Card onClick={() => !isMyRooms && router.push(`/room-details/${room.id}`)}
            className={cn(
                'cursor-pointer transition-transform duration-200 hover:scale-105',
                isMyRooms && 'cursor-default'
            )}>
            <CardHeader className="relative">

                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.capacity} capacity</CardDescription>
            </CardHeader>
            <CardContent>
                <RoomAmenities amenities={room.amenities} />
            </CardContent>
            <CardFooter>
                {isMyRooms && <Button onClick={() => router.push(`/room/${room.id}`)} variant='outline'>Edit</Button>}
            </CardFooter>

        </Card>
    )
}

export default RoomCard
