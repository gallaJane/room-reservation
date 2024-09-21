'use client'

import { Booking, Room } from '@prisma/client'
import React, { useMemo, useState } from 'react'

import { useCurrentUserStore } from '@/app/store/use-current-user.store';
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation';

import Title from '@/components/ui/title';
import { DateTimePickerForm } from '@/components/room/date-time-picker-form';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { Loader2, Wand2 } from 'lucide-react';
import useBookRoom from '@/app/store/use-book-room.store';

const RoomDetailsClient = ({ room, bookings }: { room: Room, bookings?: Booking[] }) => {
    const { setRoomData } = useBookRoom()
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [date, setDate] = useState<Date>();
    const [timeRange, setTimeRange] = useState('');
    const currentUser = useCurrentUserStore().currentUser;

    const router = useRouter();

    const handleTimeRangeChange = (timeRange: string) => {
        setTimeRange(timeRange);
    };


    // To-Do: update app with this 
    const disabledDateAndTimeSlots = useMemo(() => {
        const disabledSlots: { [date: string]: { [timeSlot: string]: boolean } } = {};
        const roomBookings = bookings?.filter(booking => booking.roomId === room.id);

        roomBookings?.forEach(booking => {
            const bookingDate = booking.date.toISOString().split('T')[0]; // 
            const timeSlot = booking.timeSlot;

            if (!disabledSlots[bookingDate]) {
                disabledSlots[bookingDate] = {};
            }
            // Mark the time slot as disabled
            disabledSlots[bookingDate][timeSlot] = true;
        });

        return disabledSlots;
    }, [bookings, room.id]);

    const handleBookRoom = () => {
        if (!currentUser?.id) {
            toast({
                variant: "destructive",
                description: 'Make sure that you are logged in!'
            });
            return;
        }

        if (!room?.id) {
            toast({
                variant: "destructive",
                description: 'Room information is missing!'
            });
            return;
        }

        if (timeRange && date) {
            setIsLoading(true);

            const bookingRoomData = {
                room,
                date,
                timeSlot: timeRange,
            };

            setRoomData(bookingRoomData);

            fetch('/api/create-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    booking: {
                        user: currentUser,
                        userId: currentUser.id,
                        room: room,
                        roomId: room.id,
                        date: date,
                        timeSlot: timeRange
                    }
                })
            })
                .then((res) => {
                    setIsLoading(false);
                    if (!res.ok) {
                        throw new Error('Booking failed');
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    router.push('/book-room');
                })
                .catch((error) => {
                    console.error(error);
                    toast({
                        variant: "destructive",
                        description: 'Something went wrong!'
                    });
                });

        } else {
            toast({
                variant: "destructive",
                description: 'Please select a time range!'
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <Title>
                    {room.name}
                </Title>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Room Amenities</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {room.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <span className="flex h-2 w-2 rounded-full bg-sky-500 mr-2" />
                                <p className="text-sm text-gray-700">{amenity}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Pick a date with a time slot</h3>
                    <DateTimePickerForm
                        date={date}
                        setDate={setDate}
                        handleTimeRangeChange={handleTimeRangeChange}
                        timeRange={timeRange}
                    />
                </div>

                <div className="mt-6">
                    <Button disabled={isLoading} type="button" onClick={handleBookRoom}>
                        {isLoading ? (
                            <Loader2 className='mr-2 h-4 w-4' />
                        ) : (
                            <Wand2 className='mr-2 h-4 w-4' />
                        )}
                        {isLoading ? 'Loading..' : 'Book Room'}
                    </Button>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default RoomDetailsClient;
