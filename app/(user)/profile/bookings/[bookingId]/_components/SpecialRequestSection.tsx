"use client";

import {BookingRequestType} from "@/constants/Booking";
import {FC} from "react";

interface SpecialRequestSectionProps {
    request: BookingRequestType;
}

const SpecialRequestSection: FC<SpecialRequestSectionProps> = ({request}) => {
    return (
        <div className="w-full flex flex-col gap-3">
            <div className="w-full bg-blue-500 bg-opacity-20 rounded-md p-2">
                <h1>Special Request</h1>
            </div>
            <div className="w-full flex flex-col gap-2 text-blue-950">
                <p>Check-in Time: {request?.checkInTime ? request.checkInTime : "-"}</p>
                <p>Check-out Time: {request?.checkOutTime ? request.checkOutTime : "-"}</p>
                <p>Smoking-room: {request?.nonSmoking ? request.nonSmoking : "No"}</p>
                <p>Other: {request?.other ? request.other : "-"}</p>
            </div>
        </div>
    );
};

export default SpecialRequestSection;