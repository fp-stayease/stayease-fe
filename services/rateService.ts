import axiosInterceptor from "@/utils/axiosInterceptor";
import { config } from "@/constants/url";
import {
  RoomWithAdjustedRatesType,
  LowestDailyRateType,
} from "@/constants/Property";
import { format } from "date-fns";
import { formatDate } from "@/utils/dateFormatter";
import logger from "@/utils/logger";
import {
  AutoRateRequestType,
  RateRequestType,
  RateResponseType,
} from "@/constants/Rates";

const rateService = {
  getTenantRates: async () => {
    try {
      const response = await axiosInterceptor.get(
        config.endpoints.rates.baseRoute,
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response.status === 404) {
        return [];
      }
      logger.error("Error fetching tenant rates", error);
      throw error;
    }
  },

  getAdjustedRates: async ({
    propertyId,
    date,
  }: {
    propertyId: number;
    date: Date;
  }): Promise<RoomWithAdjustedRatesType> => {
    const url = config.endpoints.rates.baseRoute;
    try {
      const response = await axiosInterceptor.get(url, {
        params: {
          propertyId: propertyId,
          date: formatDate(date),
        },
      });
      return response.data.data;
    } catch (error: any) {
      throw error;
    }
  },

  getLowestDailyRate: async (
    propertyId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<LowestDailyRateType[]> => {
    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");
    const url = config.endpoints.rates.getLowestDailyRate;
    try {
      const response = await axiosInterceptor.get(url, {
        params: {
          propertyId: propertyId,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      });
      return response.data.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },

  getLowestDailyCumulativeRate: async (
    propertyId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<LowestDailyRateType[]> => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const url = config.endpoints.rates.getLowestDailyCumulativeRate;
    try {
      const response = await axiosInterceptor.get(url, {
        params: {
          propertyId: propertyId,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      });
      return response.data.data;
    } catch (error: any) {
      throw error;
    }
  },

  setRate: async (
    propertyId: number,
    values: RateRequestType,
  ): Promise<RateResponseType> => {
    try {
      logger.info("Setting rate...");
      const response = await axiosInterceptor.post(
        config.endpoints.rates.baseRoute,
        values,
        { params: { propertyId } },
      );
      logger.info("Rate set successfully", response.data.data);
      return response.data.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  },

  updateRate: async (
    rateId: number,
    values: RateRequestType,
  ): Promise<RateResponseType> => {
    try {
      logger.info("Updating rate..." + rateId);
      const url = config.endpoints.rates.updateRates.replace(
        "{rateId}",
        rateId.toString(),
      );
      const response = await axiosInterceptor.put(url, {
        startDate: formatDate(values.startDate),
        endDate: formatDate(values.endDate),
        adjustmentRate: values.adjustmentRate,
        adjustmentType: values.adjustmentType,
        reason: values.reason,
      });
      return response.data.data;
    } catch (error: any) {
      throw error;
    }
  },

  deleteRate: async (rateId: number) => {
    try {
      const url = config.endpoints.rates.updateRates.replace(
        "{rateId}",
        rateId.toString(),
      );
      const response = await axiosInterceptor.delete(url);
      return response.data.statusMessage;
    } catch (error: any) {
      throw error;
    }
  },

  getAutoRateSetting: async (propertyId: number) => {
    try {
      const response = await axiosInterceptor.get(
        config.endpoints.rates.autoUpdateRates,
        { params: { propertyId } },
      );
      return response.data.data;
    } catch (error: any) {
      throw error;
    }
  },

  setOrUpdateAutoRateSetting: async (
    propertyId: number,
    values: Partial<AutoRateRequestType>,
  ) => {
    try {
      const response = await axiosInterceptor.put(
        config.endpoints.rates.autoUpdateRates,
        values,
        { params: { propertyId } },
      );
      return response.data.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  },

  deactivateAutoRateSetting: async (propertyId: number) => {
    try {
      const response = await axiosInterceptor.delete(
        config.endpoints.rates.autoUpdateRates,
        { params: { propertyId } },
      );
      return response.data.data;
    } catch (error: any) {
      throw error;
    }
  },
};

export default rateService;
