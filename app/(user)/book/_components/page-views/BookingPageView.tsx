"use client";

import { useBookingValues } from "@/hooks/transactions/useBookingValues";
import { useEffect } from "react";
import InvalidSearchParams from "@/app/(user)/book/_components/page-views/InvalidSearchParams";
import GlobalLoading from "@/components/GlobalLoading";
import BookingSummary from "@/app/(user)/book/_components/booking-summary/BookingSummary";
import BookingForm from "@/app/(user)/book/_components/booking-form/BookingForm";

const BookingPageView = () => {
    const { bookingValues, updateBookingValues } = useBookingValues();

    useEffect(() => {
        updateBookingValues();
    }, [updateBookingValues]);

    if (!bookingValues) return <GlobalLoading />;

    const { roomId, propertyId, checkInDate, checkOutDate } = bookingValues;

    if (!roomId || !propertyId || !checkInDate || !checkOutDate) return <InvalidSearchParams />;

    return (
        <div className="w-full flex flex-col gap-5">
            <h1 className="text-2xl text-blue-950 font-semibold">Pay and Confirm</h1>
            <div className="w-full flex flex-col lg:flex-row gap-7">
                <div className="w-full">
                    <BookingForm
                        key={`form-${roomId}-${propertyId}`}
                        roomId={roomId}
                        propertyId={propertyId}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                    />
                </div>
                <div className="w-full">
                    <BookingSummary
                        key={`summary-${roomId}-${propertyId}`}
                        roomId={roomId}
                        propertyId={propertyId}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                    />
                </div>
            </div>
        </div>
    );
};

export default BookingPageView;