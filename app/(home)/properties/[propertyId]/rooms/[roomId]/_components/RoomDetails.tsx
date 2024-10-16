"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, isValid, parseISO } from "date-fns";
import { useBookingValues } from "@/hooks/transactions/useBookingValues";
import { RoomWithAdjustedRatesType } from "@/constants/Property";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { usePropertySearch } from "@/hooks/properties/usePropertySearch";
import CheckInCalendar from "@/app/(home)/properties/[propertyId]/rooms/[roomId]/_components/CheckInCalendar";
import { currencyFormatter } from "@/utils/CurrencyFormatter";

interface RoomDetailsProps {
  room: RoomWithAdjustedRatesType;
}

const RoomDetailsComponent: React.FC<RoomDetailsProps> = ({ room }) => {
  const searchParams = useSearchParams();
  const { updateSearchParams, resetFilters } = usePropertySearch();
  const { bookingValues, setBookingInfo } = useBookingValues();
  const router = useRouter();

  useEffect(() => {
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;
    if (startDate || endDate) {
      setBookingInfo({
        checkInDate: startDate,
        checkOutDate: endDate,
      });
    }
  }, [searchParams, setBookingInfo]);

  const handleDateSelect = useCallback(
    (field: "checkInDate" | "checkOutDate") => (date: Date | undefined) => {
      if (date && isValid(date)) {
        const formattedDate = format(date, "yyyy-MM-dd");
        setBookingInfo({ [field]: formattedDate });

        const startDate =
          field === "checkInDate"
            ? date
            : bookingValues.checkInDate
              ? parseISO(bookingValues.checkInDate)
              : undefined;
        const endDate =
          field === "checkOutDate"
            ? date
            : bookingValues.checkOutDate
              ? parseISO(bookingValues.checkOutDate)
              : undefined;

        updateSearchParams({ startDate, endDate });
      }
    },
    [
      setBookingInfo,
      updateSearchParams,
      bookingValues.checkInDate,
      bookingValues.checkOutDate,
    ],
  );

  const handleBookNow = useCallback(async () => {
    await router.push(
      `/book?checkInDate=${bookingValues.checkInDate}&checkOutDate=${bookingValues.checkOutDate}&roomId=${room.roomId}&propertyId=${room.propertyId}&totalAdults=1`,
    );
  }, [room.roomId, room.propertyId, bookingValues, router]);

  const priceInfo = useMemo(() => {
    const priceChange = room.adjustedPrice - room.basePrice;
    const percentageChange = ((priceChange / room.basePrice) * 100).toFixed(1);
    const isIncrease = priceChange > 0;
    return { priceChange, percentageChange, isIncrease };
  }, [room.adjustedPrice, room.basePrice]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{room.roomName}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative w-full h-64 md:h-96 mb-6">
            <Image
              src={room.imageUrl || "/api/placeholder/800/400"}
              alt={room.roomName}
              fill
              sizes="100%"
              className="rounded-lg object-cover"
            />
          </div>

          <Tabs defaultValue="description" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <p className="text-gray-700">{room.roomDescription}</p>
            </TabsContent>
            <TabsContent value="amenities">
              <ul className="list-disc pl-5 text-gray-700">
                <li>Capacity: {room.roomCapacity} persons</li>
                {/* Add more amenities here */}
              </ul>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="mb-4">
                <p className="text-sm font-light text-gray-500">
                  Estimated price per night:
                </p>
                <h2 className="text-3xl font-bold mb-2">
                  {currencyFormatter(room.adjustedPrice)}
                </h2>
                {priceInfo.priceChange !== 0 && (
                  <div>
                    <p className="text-sm text-gray-500 line-through">
                      {currencyFormatter(room.basePrice)}
                    </p>
                    <p
                      className={`text-sm ${priceInfo.isIncrease ? "text-red-600" : "text-green-600"}`}
                    >
                      {priceInfo.isIncrease ? "Increased" : "Decreased"} by{" "}
                      {Math.abs(Number(priceInfo.percentageChange))}%
                    </p>
                  </div>
                )}
              </div>

              <CheckInCalendar
                bookingValues={bookingValues}
                handleDateSelect={handleDateSelect}
                resetFilters={resetFilters}
              />

              <Button
                className="w-full"
                onClick={handleBookNow}
                disabled={!room.isAvailable}
              >
                {room.isAvailable ? "Book Now" : "Not Available"}
              </Button>

              {!room.isAvailable && (
                <p className="text-red-500 mt-2 text-sm text-center">
                  This room is not available for the selected date.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsComponent;
