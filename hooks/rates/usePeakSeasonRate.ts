import { useCallback, useState } from "react";
import { RateRequestType, RateResponseType } from "@/constants/Rates";
import { useAlert } from "@/context/AlertContext";
import logger from "@/utils/logger";
import rateService from "@/services/rateService";
import { useFetchData } from "@/hooks/utils/useFetchData";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

export const usePeakSeasonRate = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const {
    data: rates,
    error: rateError,
    isLoading: rateIsLoading,
  } = useFetchData<RateResponseType[]>(
    `rates-tenantId-${session?.user?.id}`,
    () => rateService.getTenantRates(),
  );

  const handleRateOperation = useCallback(
    async (
      operation: () => Promise<void>,
      successMessage: string,
      errorMessage: string,
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        await operation();
        await queryClient.invalidateQueries({
          queryKey: [`rates-tenantId-${session?.user?.id}`],
        });
        showAlert("success", successMessage, "/dashboard/rates");
        return true;
      } catch (error: any) {
        setError(error || "An error occurred");
        logger.error(`Error: ${error}`);
        showAlert("error", errorMessage + error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [queryClient, session, showAlert],
  );

  const createRate = useCallback(
    async (propertyId: number, rateData: RateRequestType) => {
      return handleRateOperation(
        async () => {
          logger.info(`Creating rate for property: ${propertyId}`);
          await rateService.setRate(propertyId, rateData);
        },
        "Rate created successfully",
        "Failed setting rate: ",
      );
    },
    [handleRateOperation],
  );

  const updateRate = useCallback(
    async (rateId: number, rateData: RateRequestType) => {
      return handleRateOperation(
        async () => {
          await rateService.updateRate(rateId, rateData);
        },
        "Rate updated successfully",
        "Failed updating rate: ",
      );
    },
    [handleRateOperation],
  );

  const deleteRate = useCallback(
    async (rateId: number) => {
      return handleRateOperation(
        async () => {
          await rateService.deleteRate(rateId);
        },
        "Rate deleted successfully",
        "Failed deleting rate",
      );
    },
    [handleRateOperation],
  );

  return {
    rates,
    isLoading: isLoading || rateIsLoading,
    error,
    rateError,
    createRate,
    updateRate,
    deleteRate,
  };
};
