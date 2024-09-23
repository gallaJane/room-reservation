import { format, isBefore, startOfDay } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';

import { DateTimePickerData } from '@/schemas';


export type DateTimePickerFormProps = {
    form: UseFormReturn<DateTimePickerData>;
    date: Date | null | undefined;
    setDate: (date: Date | null) => void;
    startTime: string;
    setStartTime: (time: string) => void;
    endTime: string;
    setEndTime: (time: string) => void;
    generateTimeOptions: () => JSX.Element[];
    handleBookRoom: () => void;
};

const DateTimePickerForm = ({
    form,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    generateTimeOptions,
    handleBookRoom,
}: DateTimePickerFormProps) => {
    const today = startOfDay(new Date());

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleBookRoom)} className="space-y-8">
                <div className="flex flex-col sm:flex-row w-full gap-4">

                    <FormField
                        control={form.control}
                        name="datetime"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full">
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    'w-full font-normal',
                                                    !field.value && 'text-muted-foreground'
                                                )}
                                            >
                                                {field.value ? (
                                                    `${format(field.value, 'PPP')}`
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date || field.value}
                                            onSelect={(selectedDate) => {
                                                if (selectedDate) {
                                                    const newSelectedDate = new Date(selectedDate);
                                                    const year = newSelectedDate.getFullYear();
                                                    const month = newSelectedDate.getMonth() + 1;
                                                    const day = newSelectedDate.getDate();
                                                    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                                    const finalDate = new Date(`${formattedDate}T00:00:00Z`);
                                                    setDate(finalDate);
                                                    field.onChange(finalDate);
                                                } else {
                                                    console.error("Selected date is undefined");
                                                }
                                            }}
                                            disabled={(date) => isBefore(startOfDay(date), today)}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Start Time</FormLabel>
                                <FormControl>
                                    <Select
                                        defaultValue={startTime}
                                        onValueChange={(e) => {
                                            setStartTime(e);
                                            field.onChange(e);
                                        }}
                                    >
                                        <SelectTrigger className="font-normal focus:ring-0 w-[120px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <ScrollArea className="h-[15rem]">
                                                {generateTimeOptions()}
                                            </ScrollArea>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>End Time</FormLabel>
                                <FormControl>
                                    <Select
                                        defaultValue={endTime}
                                        onValueChange={(e) => {
                                            setEndTime(e);
                                            field.onChange(e);
                                        }}
                                    >
                                        <SelectTrigger className="font-normal focus:ring-0 w-[120px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <ScrollArea className="h-[15rem]">
                                                {generateTimeOptions()}
                                            </ScrollArea>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
};

export default DateTimePickerForm;
