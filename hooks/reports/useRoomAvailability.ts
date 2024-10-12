import { useState } from "react";
import { TenantRoomAvailability } from "@/constants/RoomAvailability";
import { useAlert } from "@/context/AlertContext";
import { useFetchData } from "@/hooks/utils/useFetchData";
import { availabilityService } from "@/services/availabilityService";
import { useQueryClient } from "@tanstack/react-query";

export const useRoomAvailability = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();

  const {
    data: availabilityData,
    error: dataError,
    isLoading: dataLoading,
  } = useFetchData<TenantRoomAvailability[]>("availabilityData", async () => {
    return availabilityService.getTenantRoomAvailability();
  });

  const setAvailability = async (
    roomId: number,
    startDate: Date,
    endDate: Date,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      await availabilityService.setAvailability(roomId, { startDate, endDate });
      await availabilityService.getTenantRoomAvailability();
      await queryClient.invalidateQueries({ queryKey: ["availabilityData"] });
      showAlert(
        "success",
        "Availability set successfully",
        "/dashboard/room-availability",
      );
      return true;
    } catch (err: any) {
      setError("Failed to set availability: " + err.message);
      showAlert("error", "Failed to set availability: " + err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeAvailability = async (roomId: number, availabilityId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await availabilityService.removeAvailability(roomId, availabilityId);
      await availabilityService.getTenantRoomAvailability();
      await queryClient.invalidateQueries({ queryKey: ["availabilityData"] });
      showAlert(
        "success",
        "Availability removed successfully",
        "/dashboard/room-availability",
      );
    } catch (err: any) {
      setError("Failed to remove availability: " + err.message);
      showAlert("error", "Failed to remove availability: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    availabilityData,
    dataLoading,
    isLoading,
    dataError,
    error,
    setAvailability,
    removeAvailability,
    clearError,
  };
};
