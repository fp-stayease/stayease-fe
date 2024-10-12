import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AvailablePropertyType } from "@/constants/Property";
import Image from "next/image";
import Link from "next/link";
import { FilterOptions } from "@/hooks/properties/usePropertyListings";
import { buildSearchParams } from "@/utils/urlBuilder";

interface PropertyCardProps {
  property: AvailablePropertyType;
  currentFilters: Partial<FilterOptions>;
}

const PropertyListingCard: React.FC<PropertyCardProps> = ({
  property,
  currentFilters,
}) => {
  const {
    propertyId,
    imageUrl,
    propertyName,
    address,
    tenant,
    lowestAdjustedPrice,
  } = property;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  let propertyUrl = `/properties/${propertyId}`;

  if (currentFilters) {
    const filterOptions = buildSearchParams({
      startDate: currentFilters.startDate,
      endDate: currentFilters.endDate,
    });
    propertyUrl = `/properties/${propertyId}?${filterOptions.toString()}`;
  }

  return (
    <Link href={propertyUrl} passHref className="block h-full">
      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg cursor-pointer h-full flex flex-col">
        <div className="relative h-48">
          <Image
            src={imageUrl}
            alt={`${propertyName}`}
            fill
            sizes="100%"
            className="object-cover"
          />
        </div>
        <CardContent className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-blue-950 line-clamp-1">
                {propertyName}
              </h3>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                By: {tenant}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{address}</p>
          </div>
          <div className="mt-auto">
            <p className="text-lg font-bold text-blue-950">
              <span className="text-xs font-light text-gray-600 mr-0.5">
                Starts from{" "}
              </span>
              <span>{formatPrice(lowestAdjustedPrice)}</span>
              <span className="text-xs font-light"> / night</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyListingCard;
