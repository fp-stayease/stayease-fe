"use client";
import React, { useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import RoomCard from "@/app/(home)/properties/[propertyId]/_components/RoomCard";
import PriceCalendar from "@/app/(home)/properties/[propertyId]/_components/PriceCalendar";
import { CurrentAvailablePropertyType } from "@/constants/Property";
import PropertyHeader from "@/app/(home)/properties/[propertyId]/_components/PropertyHeader";
import { useDateSelection } from "@/hooks/utils/useDateSelection";
import MapComponent from "@/components/MapComponent";
import { useSearchParams } from "next/navigation";
import ReviewTabsContent from "@/app/(home)/properties/[propertyId]/_components/ReviewTabsContent";

interface PropertyDetailsProps {
  currentProperty: CurrentAvailablePropertyType;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  currentProperty,
}) => {
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate") || undefined;
  const endDate = searchParams.get("endDate") || undefined;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const {
    checkInDate,
    checkOutDate,
    isSelectingCheckOut,
    handleDateSelect,
    handleReset,
  } = useDateSelection({ startDate, endDate });

  // to refer to the room cards
  const mapRef = useRef<HTMLDivElement>(null);

  const availableRooms = useMemo(
    () => currentProperty?.rooms || [],
    [currentProperty],
  );
  const unavailableRooms = useMemo(
    () => currentProperty?.unavailableRooms || [],
    [currentProperty],
  );

  return (
    <div className="container md:relative mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <PropertyHeader property={currentProperty!} />

          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="facilities">Info</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <p>{currentProperty?.description}</p>
            </TabsContent>
            <TabsContent value="facilities">
              <ul>
                <li>Address: {currentProperty?.address}</li>
                <li>City: {currentProperty?.city}</li>
                <li>Country: {currentProperty?.country}</li>
                <li>Rooms: {currentProperty?.rooms?.length}</li>
                <li>
                  Total capacity:{" "}
                  {currentProperty?.rooms?.reduce(
                    (acc, room) => acc + room.roomCapacity,
                    0,
                  )}
                </li>
                <li className="text-sm mt-6">
                  Leased by: {currentProperty?.tenant}
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="reviews">
              <ReviewTabsContent propertyId={currentProperty.id} />
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <div id="map" className="w-full h-64 bg-gray-200 mb-4">
              <MapComponent
                initialCenter={{
                  lat: currentProperty?.latitude || 0,
                  lng: currentProperty?.longitude || 0,
                }}
                onLocationChange={() => {}} // No-op function as we don't need to change location
                isEditable={false}
                viewOnly={false}
              />
            </div>
            <p>{currentProperty?.address}</p>
          </div>
        </div>

        <div className="relative">
          <div className="side-cards flex flex-col gap-4 md:top-0">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Available Rooms for{" "}
                  {checkInDate ? format(checkInDate, "dd MMM yyyy") : "Today"}
                </h2>
                <div className="flex space-x-4 mb-4">
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        {checkInDate
                          ? `${format(checkInDate, "dd MMM yyyy")} - ${checkOutDate ? format(checkOutDate, "dd MMM yyyy") : "Select check-out"}`
                          : "Select dates"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <PriceCalendar
                        propertyId={currentProperty?.id || 0}
                        onSelect={handleDateSelect}
                        onReset={handleReset}
                        onConfirm={() => setIsCalendarOpen(false)}
                        isCheckOut={isSelectingCheckOut}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="mb-3">
                  <p>
                    Check-in:{" "}
                    {checkInDate
                      ? format(checkInDate, "dd MMM yyyy")
                      : "Not selected"}
                  </p>
                  <p>
                    Check-out:{" "}
                    {checkOutDate
                      ? format(checkOutDate, "dd MMM yyyy")
                      : "Not selected"}
                  </p>
                </div>
                <Button
                  className="w-full"
                  onClick={() =>
                    mapRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Check Availability
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-8" ref={mapRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
            {availableRooms
              ?.sort((a, b) => a.basePrice - b.basePrice)
              .map((room) => (
                <RoomCard key={room.roomId} room={room} isAvailable={true} />
              ))}
            {unavailableRooms.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  Unavailable Rooms
                </h2>

                {unavailableRooms?.map((room) => (
                  <RoomCard key={room.roomId} room={room} isAvailable={false} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
