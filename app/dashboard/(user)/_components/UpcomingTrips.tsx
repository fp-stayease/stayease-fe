"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {useUpcomingBookings} from "@/hooks/transactions/useUpcomingBookings";
import NoResultsFound from "@/components/NoResultsFound";
import {dateFormater} from "@/utils/dateFormatter";
import ListLoading from "@/components/ListLoading";
import {useRouter} from "next/navigation";

interface UpcomingTripProps {
  className?: string;
}

const UpcomingTrips: React.FC<UpcomingTripProps> = ({ className }) => {
  const {upcomingBookings, isLoading, error} = useUpcomingBookings();
  const router = useRouter();

  if (isLoading) return <ListLoading />
  if (error) return <>Something went wrong. Please try again</>

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-950">Upcoming Trips</CardTitle>
      </CardHeader>
      <CardContent>
        {
          !upcomingBookings || upcomingBookings.length === 0 ?
              <NoResultsFound /> :
              <ul className="space-y-4">
                {upcomingBookings.map((trip, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <h3 className="font-semibold text-blue-950">{trip.property.propertyName}</h3>
                      <p className="text-sm text-gray-500">
                        {dateFormater(trip.checkInDate)} - {dateFormater(trip.checkOutDate)}
                      </p>
                      <p className="text-sm text-gray-500">{trip.property.city}, {trip.property.country}</p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => router.push(`/profile/bookings/${trip.id}`)}
                    >
                      View Details
                    </Button>
                  </li>
                ))}
              </ul>
        }
      </CardContent>
    </Card>
  );
};

export default UpcomingTrips;
