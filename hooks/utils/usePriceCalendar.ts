import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { addDays, endOfDay, format, startOfDay } from "date-fns";
import rateService from "@/services/rateService";
import logger from "@/utils/logger";

export const usePriceCalendar = (
  propertyId: number,
  isCheckOut: boolean = false,
  checkInDate?: Date,
) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startDate =
    isCheckOut && checkInDate
      ? format(checkInDate, "yyyy-MM-dd")
      : format(startOfDay(currentMonth), "yyyy-MM-dd");
  const endDateCheckIn = format(
    endOfDay(addDays(currentMonth, 31)),
    "yyyy-MM-dd",
  );
  const endDateCheckOut = format(
    endOfDay(addDays(checkInDate ?? currentMonth, 14)),
    "yyyy-MM-dd",
  );

  const { data, error, isLoading } = useQuery({
    queryKey: [
      "availabilityCalendar",
      propertyId,
      startDate,
      isCheckOut ? endDateCheckOut : endDateCheckIn,
      isCheckOut,
    ],
    queryFn: async () => {
      try {
        let result;
        if (isCheckOut && checkInDate) {
          result = await rateService.getLowestDailyCumulativeRate(
            propertyId,
            new Date(checkInDate),
            new Date(endDateCheckOut),
          );
        } else {
          result = await rateService.getLowestDailyRate(
            propertyId,
            new Date(startDate),
            new Date(endDateCheckIn),
          );
        }
        return result || [];
      } catch (error) {
        logger.error("Error fetching availability data:", { error });
        return [];
      }
    },
    enabled: (!isCheckOut || (isCheckOut && !!checkInDate)) && !!currentMonth,
    staleTime: 1000 * 60 * 5,
  });

  return {
    currentMonth,
    setCurrentMonth,
    isLoading,
    error,
    data,
  };
};
