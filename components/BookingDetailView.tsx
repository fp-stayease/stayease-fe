"use client";

import PropertySection from "@/app/(user)/profile/bookings/[bookingId]/_components/PropertySection";
import RoomSection from "@/app/(user)/profile/bookings/[bookingId]/_components/RoomSection";
import SpecialRequestSection from "@/app/(user)/profile/bookings/[bookingId]/_components/SpecialRequestSection";
import PaymentInfo from "@/app/(user)/profile/bookings/[bookingId]/_components/PaymentInfo";
import {FC} from "react";
import {useBookingDetail} from "@/hooks/transactions/useBookingDetail";
import {notFound} from "next/navigation";
import ListLoading from "@/components/ListLoading";

interface BookingDetailViewProps {
    bookingId: string;
}

const BookingDetailView: FC<BookingDetailViewProps> = ({bookingId}) => {
    const {booking, isLoading, error} = useBookingDetail(bookingId);

    if (isLoading) return <ListLoading />

    if (error) return <>Something went wrong. Please try again</>

    if (!booking) {
        notFound();
    }
    return (
        <div className="w-full grid grid-cols-1 gap-y-4">
            <h1 className="text-sm text-blue-950 text-opacity-70">
                Booking ID: {bookingId}
            </h1>
            <PropertySection booking={booking}/>
            <RoomSection bookingItem={booking.bookingItems}/>
            <SpecialRequestSection request={booking.bookingRequest}/>
            <PaymentInfo bookingId={bookingId}/>
        </div>
    );
};

export default BookingDetailView;