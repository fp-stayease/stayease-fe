"use client";

import {usePropertyCurrentDetails} from "@/hooks/properties/usePropertyCurrentDetails";

export const useBookingPropertyInfo = (
    propertyId: number,
    checkInDate: Date,
    checkOutDate: Date,
    roomId: number
) => {
    const {currentRoom: checkInRoom, isLoading, error} = usePropertyCurrentDetails(propertyId, checkInDate, roomId);
    const {currentRoom: checkOutRoom} = usePropertyCurrentDetails(propertyId, checkOutDate, roomId);

    const isAvailable = checkInRoom?.isAvailable && checkOutRoom?.isAvailable;
    const roomPrice = checkInRoom?.basePrice === checkInRoom?.adjustedPrice ?
        checkInRoom?.basePrice : checkInRoom?.adjustedPrice;

    return { room: checkInRoom, isAvailable, roomPrice, isLoading, error };
};