import { useState } from "react";
import { FormikHelpers } from "formik";
import { MultiStepFormValues } from "@/app/(auth)/_components/MultiStepForm";
import authService from "@/services/authService";
import { useAlert } from "@/context/AlertContext";
import logger from "@/utils/logger";

export const useVerifyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showAlert } = useAlert();

  const handleMultiStepSubmit = async (
    values: MultiStepFormValues,
    token: string,
    actions: FormikHelpers<MultiStepFormValues>,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.verify(values, token);
      showAlert("success", response.statusMessage, "/login");
    } catch (error: any) {
      setError("An error occurred");
      logger.error("Error during registration verification:", error);
      showAlert("error", error.message);
    } finally {
      setIsLoading(false);
      actions.setSubmitting(false);
    }
  };

  return { isLoading, error, handleMultiStepSubmit };
};
