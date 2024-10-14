import React from 'react';
import BookingList from "@/app/(user)/profile/bookings/_components/BookingList";
export const dynamic = "force-dynamic";

const UserOrdersPage = () => {
    return (
        <div className="w-full flex flex-col gap-5">
            <h1 className="text-lg text-blue-950 font-semibold">My Bookings</h1>
            <BookingList />
        </div>
    );
};

export default UserOrdersPage;