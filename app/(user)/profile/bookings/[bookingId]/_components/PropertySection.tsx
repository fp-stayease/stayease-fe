"use client";

import Image from "next/image";
import {FC} from 'react';
import {MapPin, Star} from "lucide-react";
import {BookingDataType} from "@/constants/Booking";
import {dateFormater} from "@/utils/dateFormatter";
import {currencyFormatter} from "@/utils/CurrencyFormatter";
import {usePropertyRating} from "@/hooks/reviews/useReviews";

interface  PropertySectionProps {
    booking: BookingDataType;
}

const PropertySection: FC<PropertySectionProps> = ({booking}) => {
    const {propertyRating} = usePropertyRating(booking.property.id);
    return (
        <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-col md:flex-row max-md:gap-y-2 justify-between text-blue-950">
                <h1>Check-in: {dateFormater(booking.checkInDate)}</h1>
                <h1>Check-out: {dateFormater(booking.checkOutDate)}</h1>
                <h1>Total: {currencyFormatter(booking.totalPrice)}</h1>
            </div>
            <div className="w-full bg-blue-500 bg-opacity-20 rounded-md p-2">
                <h1>Property</h1>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-2">
                <Image src={booking.property.imageUrl} alt={"room"} width={160} height={160} className="w-30 h-24 object-cover rounded-md"/>
                <div className="flex flex-col gap-1">
                    <h1 className="text-medium text-blue-950">{booking.property.propertyName}</h1>
                    <div className="flex items-center gap-2">
                        <MapPin className="text-blue-950 w-4 h-4"/>
                        <p className="text-blue-950 text-sm">Location</p>
                    </div>
                    <p className="text-blue-950  text-sm">{booking.property.address}</p>
                    <div className="flex items-center gap-2">
                        <Star className="text-blue-950 w-4 h-4" />
                        <p className="text-blue-950 text-sm">
                            {propertyRating?.avgRating?.toFixed(1)} Ratings
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PropertySection;