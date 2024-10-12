import { useCallback, useState } from "react";
import { usePeakSeasonRate } from "./usePeakSeasonRate";
import { useAutoRateSetting } from "@/hooks/rates/useAutoRateSetting";
import { AutoRateRequestType, RateRequestType } from "@/constants/Rates";

export const useRatesManagement = (
  onClose: () => void,
  initialPropertyId?: number,
) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
    initialPropertyId || null,
  );
  const [error, setError] = useState<string | null>(null);
  const {
    createRate,
    updateRate,
    isLoading: manualLoading,
    error: manualError,
  } = usePeakSeasonRate();
  const {
    autoRateSetting,
    updateAutoRateSetting,
    deactivateAutoRateSetting,
    isLoading: autoLoading,
    error: autoError,
  } = useAutoRateSetting(selectedPropertyId || 0);

  const handlePropertyChange = useCallback((propertyId: string) => {
    setSelectedPropertyId(propertyId ? Number(propertyId) : null);
    setError(propertyId ? null : "Please select a property");
  }, []);

  const handleManualSubmit = useCallback(
    async (rateData: RateRequestType, isEditing: boolean, rateId?: number) => {
      if (!selectedPropertyId) {
        setError("Please select a property");
        return;
      }

      const success =
        isEditing && rateId
          ? await updateRate(rateId, rateData)
          : await createRate(selectedPropertyId, rateData);

      if (success) onClose();
    },
    [selectedPropertyId, createRate, updateRate, onClose],
  );

  const handleAutoSubmit = useCallback(
    async (data: Partial<AutoRateRequestType>) => {
      if (!selectedPropertyId) {
        setError("Please select a property");
        return;
      }

      const success = await updateAutoRateSetting(data);
      if (success) onClose();
    },
    [selectedPropertyId, updateAutoRateSetting, onClose],
  );

  return {
    selectedPropertyId,
    error: error || autoError || manualError,
    isLoading: autoLoading || manualLoading,
    autoRateSetting,
    handlePropertyChange,
    handleManualSubmit,
    handleAutoSubmit,
    deactivateAutoRateSetting,
  };
};
