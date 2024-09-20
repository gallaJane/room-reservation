'use client'

import React, { useState, useEffect } from 'react'

import { useForm, SubmitHandler, } from "react-hook-form";
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddRoomSchema,
  AddRoomFormData
} from '@/schemas';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Title from '@/components/ui/title';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Toaster } from '@/components/ui/toaster';


import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation';
import { Room } from '@prisma/client';

import { Eye, Hotel, Loader2, Pencil, PencilLine, Trash } from 'lucide-react';

export type AddRoomFormProps = {
  room: Room | null
}

const amenitiesList = ["Whiteboard", "Projector", "TV", "Conference Phone", "Air Conditioning"];

const AddRoomForm = ({ room }: AddRoomFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<AddRoomFormData>({
    defaultValues: {
      name: '',
      capacity: Number(1),
      amenities: []
    },
    resolver: zodResolver(AddRoomSchema),
  });

  useEffect(() => {
    if (room) {
      form.reset({
        name: room.name,
        capacity: room.capacity,
        amenities: room.amenities || [],
      });
    }
  }, [room, form]);


  const handleDeleteRoom = async (room: Room) => {
    setIsDeleting(true);

    try {
      await axios.delete(`/api/room/${room.id}`)
      setIsDeleting(false);
      toast({
        variant: "default",
        description: 'Room deleted'
      })
      router.push('/room/new')

    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: 'Something went wrong!'
      })
      setIsLoading(false);
    }
  }

  const handleRoomRequest = async (url: string, method: 'patch' | 'post', data: AddRoomFormData) => {
    setIsLoading(true);
    try {
      const res = await axios[method](url, data);
      toast({ variant: "default", description: room ? 'Room updated' : 'Room created' });
      router.push(`/room/${res.data.id}`);
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", description: 'Something went wrong!' });
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit: SubmitHandler<AddRoomFormData> = (data) => {
    const url = room ? `/api/room/${room.id}` : '/api/room';
    const method: 'patch' | 'post' = room ? 'patch' : 'post';
    handleRoomRequest(url, method, data);
  };



  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <Title className=''>{room ? 'Update room' : 'Describe your room'}</Title>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex-1 flex flex-col gap-6'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Name</FormLabel>
                    <FormDescription>
                      Provide room name
                    </FormDescription>
                    <FormControl>
                      <Input placeholder="Room Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Persons capacity</FormLabel>
                    <FormDescription>
                      Provide persons capacity
                    </FormDescription>
                    <FormControl>
                      <Input type="number" placeholder="Capacity number" {...field} min={1}
                        onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex-1 flex flex-col gap-6'>
              <FormField
                control={form.control}
                name="amenities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amenities</FormLabel>
                    <FormDescription>Please select amenities for this room</FormDescription>

                    <FormControl>
                      <div className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                        <div className='grid grid-cols-2 gap-4 w-full'>
                          {amenitiesList.map((amenity) => (
                            <div key={amenity} className="flex items-center">
                              <Checkbox
                                checked={field.value?.includes(amenity)}
                                onCheckedChange={(isChecked) => {
                                  const currentAmenities = field.value || [];
                                  if (isChecked) {
                                    field.onChange([...currentAmenities, amenity]);
                                  } else {
                                    field.onChange(currentAmenities.filter(a => a !== amenity));
                                  }
                                }}
                              />
                              <FormLabel className="ml-2">{amenity}</FormLabel>
                            </div>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-between gap-2 flex-wrap'>
                {/* DELETE */}
                {room &&
                  <Button className='max-width-[150px]'
                    onClick={() => handleDeleteRoom(room)} variant='ghost' type='button' disabled={isDeleting || isLoading}>
                    {isDeleting ?
                      <><Loader2 className='mr-2 h-4 w-4' /> Deleting...</> : <><Trash className='mr-2 h-4 w-4' />Delete</>
                    }
                  </Button>
                }
                {/* VIEW */}
                {room &&
                  <Button className='max-width-[150px]'
                    onClick={() => router.push(`/room-details/${room.id}`)}
                    type='button' variant='outline'>
                    <Eye className='mr-2 h-4 w-4' />View Room
                  </Button>
                }

                {/* CREATE */}
                {room ?
                  <Button disabled={isLoading} className='max-width-[150px]'>
                    {isLoading ?
                      <><Loader2 className='mr-2 h-4 w-4' /> Updating...</> : <><PencilLine className='mr-2 h-4 w-4' />Update</>
                    }
                  </Button>
                  : <Button disabled={isLoading} className='max-width-[150px]'>
                    {isLoading ?
                      <><Loader2 className='mr-2 h-4 w-4' /> Creating...</> : <><Pencil className='mr-2 h-4 w-4' />Create Room</>
                    }
                  </Button>
                }
              </div>
            </div>
          </div>

          {/* TO DO: IMPLEMENT UPLOADING IMAGE SO USERS CAN SEE HOW ROOM LOOKS LIKE */}

        </form>

      </Form>
      <Toaster />
    </div>
  )
}

export default AddRoomForm;