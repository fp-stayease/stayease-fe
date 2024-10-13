"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useRoomDetail } from "@/hooks/properties/useRoomDetail";
import { FC } from "react";
import {usePropertyRating} from "@/hooks/reviews/useReviews";

interface PropertyInfoProps {
    propertyId: number;
    roomId: number;
}

const PropertyInfo: FC<PropertyInfoProps> = ({ propertyId, roomId }) => {
    const { room, isLoading: roomLoading, error: roomError } = useRoomDetail(propertyId, roomId);
    const { propertyRating, isLoading: ratingLoading, error: ratingError } = usePropertyRating(propertyId);

    if (roomLoading || ratingLoading) return <div>Loading...</div>;
    if (roomError || ratingError) return <div>Error loading property information</div>;

    return (
        <div className="w-full flex gap-4 border-b border-gray-200 pb-5">
            <div className="w-max rounded-md">
                <Image
                    src={room?.imageUrl || '/placeholder-image.jpg'}
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
                    <p className="text-sm text-blue-950 font-medium">
                        {propertyRating?.avgRating ? propertyRating.avgRating.toFixed(1) : '0.0'}
                    </p>
                    <p className="text-sm text-blue-950 text-opacity-70">
                        ({propertyRating?.totalReviewers || 0} Reviews)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PropertyInfo;