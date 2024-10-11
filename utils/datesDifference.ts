import { differenceInDays } from "date-fns";

export function calculateDaysBetweenDates(checkInDate: string, checkOutDate: string) {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    return differenceInDays(checkOut, checkIn);
}