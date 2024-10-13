"use client";

import {useQuery} from "@tanstack/react-query";
import {bookingsService} from "@/services/bookingsService";

export const useBookingDetail = (bookingId: string) => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-booking-detail", bookingId],
        queryFn: async () => bookingsService.getBookingDetail(bookingId),
        enabled: !!bookingId
    });

    return {
        booking: data,
        isLoading,
        error,
    };
};