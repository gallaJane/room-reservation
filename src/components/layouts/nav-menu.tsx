"use client"

import * as React from "react"
import { ChevronsUpDownIcon, Plus, DoorOpen, BookOpenCheck } from "lucide-react"



import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"


export function NavMenu() {
    const router = useRouter()
        ;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <ChevronsUpDownIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer flex gap-2 items-center" onClick={() => router.push('/room/new')}>
                    <Plus size={15} />
                    <span>
                        Add Room
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex gap-2 items-center" onClick={() => router.push('/my-rooms')}>
                    <DoorOpen size={15} />
                    <span>
                        Rooms
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex gap-2 items-center" onClick={() => router.push('/my-bookings')}>
                    <BookOpenCheck size={15} />
                    <span>My Bookings</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
