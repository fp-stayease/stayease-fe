"use client";

import {useQuery} from "@tanstack/react-query";
import {bookingsService} from "@/services/bookingsService";

export const useUpcomingBookings = () => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-upcoming-bookings"],
        queryFn: async () => await bookingsService.getUpcomingBookings()
    });

    return {
        upcomingBookings: data,
        isLoading,
        error
    };
};