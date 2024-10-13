import React from "react";
import {MapPin, Star} from "lucide-react";
import Image from "next/image";
import { CurrentAvailablePropertyType } from "@/constants/Property";
import {usePropertyRating} from "@/hooks/reviews/useReviews";

interface PropertyHeaderProps {
  property: CurrentAvailablePropertyType;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({ property }) => {
  const {propertyRating, isLoading, error} = usePropertyRating(property.id);
  return (
    <>
      <div className="grid grid-cols-1 mb-2">
          <h1 className="text-3xl font-bold mb-4">{property.propertyName}</h1>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Star size={16} />
              <span>
                  {propertyRating?.avgRating ? propertyRating.avgRating : 0} ({propertyRating?.totalReviewers} reviews)
              </span>
          </div>
      </div>
      <div className="flex flex-col items-start mb-4">
        <div className="flex items-center mb-2 text-sm text-gray-500">
          <MapPin className="mr-2" size={16} />
          <span>{property.address}</span>
        </div>
      </div>
      <Image
        src={property.imageUrl || "/api/placeholder/800/400"}
        alt={property.propertyName}
        width={800}
        height={400}
        className="w-full h-64 object-cover mb-4 rounded"
      />
    </>
  );
};

export default PropertyHeader;
