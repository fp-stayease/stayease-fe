"use client";

import Image from "next/image";
import propsImg from "@/assets/images/template_property.jpg";
import { Star } from "lucide-react";
import { useBookingValues } from "@/hooks/transactions/useBookingValues";
import { useRoomDetail } from "@/hooks/properties/useRoomDetail";

const PropertyInfo = () => {
  const { bookingValues } = useBookingValues();
  const roomId = bookingValues.roomId;
  const propertyId = bookingValues.propertyId;

  const { room, isLoading, error } = useRoomDetail(propertyId!, roomId!);
  return (
    <div className="w-full flex gap-4 border-b border-gray-200 pb-5">
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <div className="w-max rounded-md">
            <Image
              src={propsImg}
              height={160}
              width={160}
              alt={"room"}
              className="object-cover rounded-md h-28 w-32"
            />
          </div>
          <div className="w-max flex flex-col gap-2">
            <h1 className="text-blue-950 font-medium">
              {room?.propertySummary?.propertyName}
            </h1>
            <p className="text-sm text-blue-950 text-opacity-70">
              {room?.name}
            </p>
            <div className="w-full flex items-center gap-2">
              <Star className="w-4 h-4" />
              <p className="text-sm text-blue-950 font-medium">4.91</p>
              <p className="text-sm text-blue-950 text-opacity-70">
                (33 Reviews)
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyInfo;
