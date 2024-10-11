"use client";

import { currencyFormatter } from "@/utils/CurrencyFormatter";
import { calculateDaysBetweenDates } from "@/utils/datesDifference";
import { useRoomDetail } from "@/hooks/properties/useRoomDetail";
import {FC} from "react";
import {useBookingPropertyInfo} from "@/hooks/transactions/useBookingPropertyInfo";
import {priceCalculator} from "@/utils/priceCalculator";

interface PriceDetailProps {
    propertyId: number;
    roomId: number;
    checkInDate: string;
    checkOutDate: string;
}

const PriceDetail: FC<PriceDetailProps> = ({propertyId, roomId, checkOutDate, checkInDate}) => {
    const daysDiff = calculateDaysBetweenDates(checkInDate, checkOutDate);

    const {
        roomPrice,
        isLoading,
        error
    } = useBookingPropertyInfo(propertyId, new Date(checkInDate), new Date(checkOutDate), roomId)

    return (
        <div className="w-full flex flex-col gap-3">
            {
                error && <>Something went wrong. Please try again</>
            }
            {isLoading && !roomPrice ? (
                <>Loading...</>
            ) : (
                <>
                    <div className="w-full flex flex-col gap-3 border-b border-gray-200 pb-5">
                        <h1 className="text-blue-950 font-semibold text-lg">
                            Price Details
                        </h1>
                        <div className="w-full flex flex-col gap-2 text-blue-950">
                            <div className="w-full flex items-center justify-between">
                                <p>
                                    {currencyFormatter(roomPrice)} x {daysDiff} nights
                                </p>
                                <p>{currencyFormatter(roomPrice! * daysDiff)}</p>
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <p>Tax (11%)</p>
                                <p>{currencyFormatter(roomPrice! * daysDiff * 0.11)}</p>
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <p>Service fee (10%)</p>
                                <p>{currencyFormatter(roomPrice! * daysDiff * 0.1)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <h1>Total (IDR)</h1>
                        <h1>{currencyFormatter(priceCalculator(roomPrice!, daysDiff))} </h1>
                    </div>
                </>
            )}
        </div>
    );
};

export default PriceDetail;