"use client";

import {BookingItemsDataType} from "@/constants/Booking";
import {FC} from "react";
import {currencyFormatter} from "@/utils/CurrencyFormatter";

interface RoomSectionProps {
    bookingItem: BookingItemsDataType[];
}

const RoomSection: FC<RoomSectionProps> = ({bookingItem}) => {
    return (
        <div className="w-full flex flex-col gap-3 text-sm text-blue-950">
            <div className="w-full bg-blue-500 bg-opacity-20 rounded-md p-2">
                <h1>Rooms</h1>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-950">
            {
                bookingItem.map((item, i) => (
                    <div key={i} className="w-full flex flex-col gap-1">
                        <h1>{item.room.name}</h1>
                        <p>Price: {currencyFormatter(item.room.basePrice)}</p>
                        <p>Description: {item.room.description}</p>
                        <p>Capacity: {item.room.capacity} people</p>
                    </div>
                ))
            }
            </div>
        </div>
    );
};

export default RoomSection;