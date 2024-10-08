import { useState } from "react";
import { useAlert } from "@/context/AlertContext";
import authService from "@/services/authService";
import { ForgotPasswordValues } from "@/constants/Auth";
import { passwordService } from "@/services/passwordService";

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { showAlert } = useAlert();

  const forgotPassword = async (email: string): Promise<any> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await passwordService.forgotPassword(email);
      setIsSuccess(true);
      showAlert(
        "success",
        "Password reset instructions sent! Please check your email.",
      );
      return response;
    } catch (err: any) {
      setError(err.response.data.message);
      showAlert("error", "Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (
    token: string,
    passwordValues: ForgotPasswordValues,
  ): Promise<any> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await passwordService.resetPassword(
        token,
        passwordValues,
      );
      setIsSuccess(true);
      showAlert(
        "success",
        "Password reset successful! Please log in.",
        "/login",
      );
      return response;
    } catch (err: any) {
      setError(err.response.data.message);
      showAlert("error", "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isSuccess, isLoading, error, forgotPassword, resetPassword };
};
