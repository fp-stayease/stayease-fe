"use client";

import BookingDateInfo from "@/app/(user)/book/_components/BookingDateInfo";
import GuestInfo from "@/app/(user)/book/_components/GuestInfo";

const UserStayingDataForm = () => {
    return (
        <div className="w-full flex flex-col gap-5 border-b border-gray-200 pb-5">
            <h1 className="text-blue-950">Booking Information</h1>
            <BookingDateInfo />
            <GuestInfo />
        </div>
    );
};

export default UserStayingDataForm;