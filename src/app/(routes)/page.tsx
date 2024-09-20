
import React from "react";
import RoomList from "@/components/room/room-list";
import { getRooms } from "@/actions/get-rooms";

export type HomeProps = {
  search: {
    name: string,
    capacity: number
  }
}

export default async function Home({ search }: HomeProps) {
  const rooms = await getRooms(search?.name);

  if (!rooms) return <>No rooms found!</>

  return (
    <>
      <RoomList rooms={rooms} />
    </>
  )
}