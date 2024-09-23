'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentUserStore } from '@/app/store/use-current-user.store';
import useBookRoom from '@/app/store/use-book-room.store';
import { toast } from '@/hooks/use-toast';

import RoomAmenities from '@/components/room/room-amenities';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { SelectItem } from '@/components/ui/select';
import { Booking, Room } from '@prisma/client';
import Title, { TypeEnum } from '@/components/ui/title';
import DateTimePickerForm from '@/components/room/date-time-picker-form';

import {
    DateTimePickerSchema,
    DateTimePickerData
} from '@/schemas';

import { Loader2, Wand2 } from 'lucide-react';


const DatePickerForm = ({ room, bookings }: { room: Room, bookings?: Booking[] }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState<Date | null>();
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');

    const currentUser = useCurrentUserStore().currentUser;
    const { setRoomData } = useBookRoom();
    const router = useRouter();


    const form = useForm<DateTimePickerData>({
        resolver: zodResolver(DateTimePickerSchema),
    });


    const disabledDateAndTimeSlots = useMemo(() => {
        const disabledSlots: { [date: string]: { [timeSlot: string]: boolean } } = {};

        const roomBookings = bookings?.filter(booking => booking.roomId === room.id);

        roomBookings?.forEach(booking => {
            const bookingDate = new Date(booking.date).toISOString().split('T')[0];
            const timeSlot = booking.timeSlot;

            // Initialize the date entry if it doesn't exist
            disabledSlots[bookingDate] ??= {};

            // Mark the exact time slot as disabled
            disabledSlots[bookingDate][timeSlot] = true;
        });

        return disabledSlots;
    }, [bookings, room.id]);



    const handleBookRoom = () => {
        if (!currentUser?.id) {
            toast({
                variant: 'destructive',
                description: 'Make sure that you are logged in!',
            });
            return;
        }

        if (!room?.id) {
            toast({
                variant: 'destructive',
                description: 'Room information is missing!',
            });
            return;
        }

        if (startTime && endTime && date) {
            setIsLoading(true);

            const formattedDate = new Date(date).toISOString().split('T')[0];
            const finalDate = new Date(`${formattedDate}T00:00:00Z`);

            const bookingRoomData = {
                room,
                date: finalDate,
                timeSlot: `${startTime} - ${endTime}`,
            };

            setRoomData(bookingRoomData);

            fetch('/api/create-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    booking: {
                        user: currentUser,
                        userId: currentUser.id,
                        room: room,
                        roomId: room.id,
                        date: finalDate,
                        timeSlot: `${startTime} - ${endTime}`,
                    },
                }),
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
                    router.refresh();
                    router.push('/book-room');
                })
                .catch((error) => {
                    console.error(error);
                    toast({
                        variant: 'destructive',
                        description: 'Something went wrong!',
                    });
                });
        } else {
            toast({
                variant: 'destructive',
                description: 'Please select a time range!',
            });
        }
    };


    const generateTimeOptions = () => {
        return Array.from({ length: 96 }).map((_, i) => {
            const hour = Math.floor(i / 4).toString().padStart(2, '0');
            const minute = ((i % 4) * 15).toString().padStart(2, '0');
            const timeString = `${hour}:${minute}`;

            const isDisabled = date && Object.keys(disabledDateAndTimeSlots).includes(date.toISOString().split('T')[0]) &&
                Object.entries(disabledDateAndTimeSlots[date.toISOString().split('T')[0]]).some(([slot]) => {
                    const [start, end] = slot.split(' - ');
                    return isTimeInRange(timeString, start, end);
                });

            return (
                <SelectItem key={i} value={timeString} disabled={!!isDisabled}>
                    {timeString}
                </SelectItem>
            );
        });
    };

    // Helper function to check if a time is within a range
    const isTimeInRange = (time: string, start: string, end: string) => {
        const timeMoment = new Date(`1970-01-01T${time}:00`);
        const startMoment = new Date(`1970-01-01T${start}:00`);
        const endMoment = new Date(`1970-01-01T${end}:00`);
        return timeMoment >= startMoment && timeMoment < endMoment;
    };

    return (

        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <Title>
                    {room.name}
                </Title>
                <div className="mt-4">
                    <Title as="h3" type={TypeEnum.card}>
                        Room Amenities
                    </Title>
                    <RoomAmenities amenities={room.amenities} />
                </div>

                <div className="mt-6">
                    <Title as="h3" type={TypeEnum.card}>
                        Pick a date with a time slot
                    </Title>

                    <DateTimePickerForm
                        form={form}
                        date={date}
                        setDate={setDate}
                        startTime={startTime}
                        setStartTime={setStartTime}
                        endTime={endTime}
                        setEndTime={setEndTime}
                        generateTimeOptions={generateTimeOptions}
                        handleBookRoom={handleBookRoom}
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

export default DatePickerForm;