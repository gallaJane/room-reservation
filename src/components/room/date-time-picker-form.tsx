"use client"

import React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import TimeRangePicker from "shadcn-time-range-picker";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export type DateTimePickerFormProps = {
    date: Date | undefined,
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
    handleTimeRangeChange: (timeRange: string) => void,
    timeRange: string,
    disabledSlots?: { [date: string]: { [timeSlot: string]: boolean } }
}

export function DateTimePickerForm({
    date,
    setDate,
    handleTimeRangeChange,
    timeRange,
    disabledSlots
}: DateTimePickerFormProps) {

    //To-Do: implement this in the app
    const isDisabledDate = (dateToCheck: Date) => {
        const dateString = dateToCheck.toISOString().split('T')[0];
        return disabledSlots && disabledSlots[dateString] !== undefined;
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, `PPP ${timeRange}`) : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
                <div className="p-3 border-t border-border">
                    <div>
                        <h1>Select a Time Range</h1>
                        <TimeRangePicker
                            initialStartTime="08:00"
                            initialEndTime="17:00"
                            onTimeRangeChange={handleTimeRangeChange}
                            sort={true}
                            showApplyButton={true}
                            layout="row"
                            startTimeLabel="Work Start"
                            endTimeLabel="Work End"
                            step={15}
                            buttonProps={{
                                variant: "outline",
                                className: "font-semibold",
                            }}

                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
