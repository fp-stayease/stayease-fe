"use client";

import { useBookingValues } from "@/hooks/transactions/useBookingValues";
import { currencyFormatter } from "@/utils/CurrencyFormatter";
import { calculateDaysBetweenDates } from "@/utils/datesDifference";
import { useRoomDetail } from "@/hooks/properties/useRoomDetail";

const PriceDetail = () => {
  const { bookingValues } = useBookingValues();
  const roomId = bookingValues.roomId;
  const propertyId = bookingValues.propertyId;
  const checkInDate = bookingValues.checkInDate;
  const checkOutDate = bookingValues.checkOutDate;

  const daysDiff = calculateDaysBetweenDates(checkInDate!, checkOutDate!);

  const { room, isLoading, error } = useRoomDetail(propertyId!, roomId!);

  return (
    <div className="w-full flex flex-col gap-3">
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <div className="w-full flex flex-col gap-3 border-b border-gray-200 pb-5">
            <h1 className="text-blue-950 font-semibold text-lg">
              Price Details
            </h1>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex items-center justify-between">
                <p>
                  {currencyFormatter(room?.basePrice)} x {daysDiff} nights
                </p>
                <p>{currencyFormatter(room?.basePrice * daysDiff)}</p>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <h1>Total (IDR)</h1>
            <h1>{currencyFormatter(room?.basePrice * daysDiff)} </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default PriceDetail;
