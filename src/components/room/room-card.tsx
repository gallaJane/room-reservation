'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Room } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'

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
                <div className="flex justify-center pt-4 pb-4 bg-gray-100 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                        {room.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <span className="flex h-2 w-2 rounded-full bg-sky-500 mr-2" />
                                <p className="text-sm text-muted-foreground">{amenity}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                {isMyRooms && <Button onClick={() => router.push(`/room/${room.id}`)} variant='outline'>Edit</Button>}
            </CardFooter>

        </Card>
    )
}

export default RoomCard
