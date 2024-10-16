import { useCallback, useEffect, useState } from "react";
import { AutoRateRequestType, AutoRateResponseType } from "@/constants/Rates";
import { useAlert } from "@/context/AlertContext";
import rateService from "@/services/rateService";
import { useFetchData } from "@/hooks/utils/useFetchData";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import logger from "@/utils/logger";

export const useAutoRateSetting = (propertyId: number) => {
  const [autoRateSetting, setAutoRateSetting] =
    useState<AutoRateResponseType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const {
    data: fetchedSetting,
    error: rateError,
    isLoading: rateIsLoading,
  } = useFetchData<AutoRateResponseType>(
    `auto-rate-setting-${propertyId}`,
    () => rateService.getAutoRateSetting(propertyId),
    { enabled: propertyId !== 0 },
  );

  useEffect(() => {
    if (fetchedSetting) {
      setAutoRateSetting(fetchedSetting);
    }
  }, [fetchedSetting]);

  const handleAutoRateOperation = useCallback(
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

  const updateAutoRateSetting = useCallback(
    async (data: Partial<AutoRateRequestType>) => {
      return handleAutoRateOperation(
        async () => {
          await rateService.setOrUpdateAutoRateSetting(propertyId, data);
        },
        "Auto rate setting updated successfully",
        "Failed updating auto rate setting: ",
      );
    },
    [handleAutoRateOperation, propertyId],
  );

  const deactivateAutoRateSetting = useCallback(async () => {
    return handleAutoRateOperation(
      async () => {
        await rateService.deactivateAutoRateSetting(propertyId);
      },
      "Auto rate setting deactivated successfully",
      "Failed deactivating auto rate setting: ",
    );
  }, [handleAutoRateOperation, propertyId]);

  return {
    autoRateSetting,
    error,
    rateError,
    isLoading: isLoading || rateIsLoading,
    updateAutoRateSetting,
    deactivateAutoRateSetting,
  };
};
