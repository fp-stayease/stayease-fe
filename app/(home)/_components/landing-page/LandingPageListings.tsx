"use client";
import React from "react";
import { usePropertyListings } from "@/hooks/properties/usePropertyListings";
import PropertyListingSkeleton from "@/app/(home)/properties/_components/PropertyListingSkeleton";
import PropertyListingCard from "@/app/(home)/properties/_components/PropertyListingCard";
import NoResultsFound from "@/components/NoResultsFound";

const LandingPageListings = () => {
  const { properties, isLoading } = usePropertyListings();

  const hasResults = properties && properties.length > 0;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-950">
        Reserve The Finest Rooms
      </h1>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <PropertyListingSkeleton key={index} />
            ))}
        </div>
      ) : hasResults ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {properties
              .sort(() => 0.5 - Math.random())
              .slice(0, 6)
              .map((property) => (
                <PropertyListingCard
                  key={property.propertyId}
                  property={property}
                  currentFilters={{}}
                />
              ))}
          </div>
        </>
      ) : (
        <NoResultsFound />
      )}
    </div>
  );
};

export default LandingPageListings;
