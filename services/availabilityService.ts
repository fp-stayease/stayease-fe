import { config } from "@/constants/url";
import axiosInterceptor from "@/utils/axiosInterceptor";
import { formatDate } from "@/utils/dateFormatter";
import logger from "@/utils/logger";
import {
  AvailabilityRequest,
  AvailabilityResponse,
  TenantRoomAvailability,
} from "@/constants/RoomAvailability";

export const availabilityService = {
  getTenantRoomAvailability: async (): Promise<TenantRoomAvailability[]> => {
    try {
      const url = config.endpoints.availability.getTenantAvailability;
      const response = await axiosInterceptor.get(url);
      return await response.data.data;
    } catch (error: any) {
      if (error.response.status === 404) {
        return [];
      }
      logger.error("Error fetching tenant room availability", error);
      throw error.response.data;
    }
  },

  setAvailability: async (
    roomId: number,
    data: AvailabilityRequest,
  ): Promise<AvailabilityResponse> => {
    try {
      logger.info("Setting availability for room", { id: roomId, data });
      const url = config.endpoints.availability.baseRoute;
      const response = await axiosInterceptor.post(
        url,
        {
          startDate: formatDate(data.startDate),
          endDate: formatDate(data.endDate),
        },
        {
          params: { roomId },
        },
      );
      return await response.data.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  removeAvailability: async (
    roomId: number,
    availabilityId: number,
  ): Promise<string> => {
    try {
      const url = config.endpoints.availability.baseRoute;
      const response = await axiosInterceptor.delete(url, {
        params: { roomId, availabilityId },
      });
      logger.info("Availability removed", { roomId, availabilityId });
      return await response.data.statusMessage;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
