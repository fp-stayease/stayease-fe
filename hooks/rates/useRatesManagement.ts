import { useCallback, useState } from "react";
import { useAlert } from "@/context/AlertContext";
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
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();
  const { createRate, updateRate } = usePeakSeasonRate();
  const { autoRateSetting, updateAutoRateSetting, deactivateAutoRateSetting } =
    useAutoRateSetting(selectedPropertyId || 0);

  const handlePropertyChange = useCallback((propertyId: string) => {
    if (!propertyId) {
      setError("Please select a property");
    } else {
      setSelectedPropertyId(Number(propertyId));
      setError(null);
    }
  }, []);

  const handleSubmitSuccess = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleManualSubmit = useCallback(
    async (rateData: RateRequestType, isEditing: boolean, rateId?: number) => {
      if (!selectedPropertyId) {
        setError("Please select a property");
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        if (isEditing && rateId) {
          await updateRate(rateId, rateData);
          showAlert("success", "Rate updated successfully", "/dashboard/rates");
        } else if (selectedPropertyId) {
          await createRate(selectedPropertyId, rateData);
          showAlert("success", "Rate created successfully", "/dashboard/rates");
        } else {
          setError("Please select a property");
          return;
        }
        handleSubmitSuccess();
      } catch (error: any) {
        setError("Failed to create rate" + error.response.data);
        console.error("Error creating rate:" + error.response.data);
        showAlert("error", "Failed to create rate: " + error.response.data);
      }
    },
    [
      selectedPropertyId,
      showAlert,
      createRate,
      updateRate,
      handleSubmitSuccess,
    ],
  );

  const handleAutoSubmit = useCallback(
    async (data: Partial<AutoRateRequestType>) => {
      if (!selectedPropertyId) {
        setError("Please select a property");
        return;
      }

      console.log("Auto submit data", data);
      if (selectedPropertyId) {
        try {
          await updateAutoRateSetting(data);
          showAlert(
            "success",
            "Auto rate setting updated successfully",
            "/dashboard/rates",
          );
        } catch (error: any) {
          setError("Failed to update rate setting" + error.response.data);
          console.error("Error updating rate setting:", error.response.data);
          showAlert(
            "error",
            "Failed to update rate setting: " + error.response.data,
          );
        }
        handleSubmitSuccess();
      } else {
        setError("Please select a property");
      }
    },
    [selectedPropertyId, showAlert, updateAutoRateSetting, handleSubmitSuccess],
  );

  return {
    selectedPropertyId,
    error,
    isLoading,
    autoRateSetting,
    handlePropertyChange,
    handleManualSubmit,
    handleAutoSubmit,
    deactivateAutoRateSetting,
  };
};
