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


import { Session } from "next-auth";

type NavMenuProps = {
    currentUser: Session["user"] | undefined;
}


export function NavMenu({ currentUser }: NavMenuProps) {
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <ChevronsUpDownIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {currentUser?.role == 'ADMIN' && (
                    <div>
                        <DropdownMenuItem className="cursor-pointer flex gap-2 items-center" onClick={() => router.push('/room/new')}>
                            <Plus size={15} />
                            <span>
                                Add Room
                            </span>
                        </DropdownMenuItem>


                        <DropdownMenuItem className="cursor-pointer flex gap-2 items-center" onClick={() => router.push('/all-rooms')}>
                            <DoorOpen size={15} />
                            <span>
                                Rooms
                            </span>
                        </DropdownMenuItem>
                    </div>
                )}
                <DropdownMenuItem className="cursor-pointer flex gap-2 items-center" onClick={() => router.push('/my-bookings')}>
                    <BookOpenCheck size={15} />
                    <span>My Bookings</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
