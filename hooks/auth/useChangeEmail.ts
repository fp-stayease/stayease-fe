import { useState } from "react";
import { useAlert } from "@/context/AlertContext";
import { profileService } from "@/services/profileService";
import { handleError } from "@/utils/errorHandler";
import { useSignOut } from "@/hooks/auth/useSignOut";

export const useChangeEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showAlert } = useAlert();
  const { handleSignOut } = useSignOut();

  const initiateChangeEmail = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await profileService.changeEmailRequest(email);
      showAlert(
        "success",
        "Email change request sent successfully, please check your email to verify the change.",
      );
    } catch (err: any) {
      handleError(
        err,
        "Failed to send email verification link. Please try again.",
        setError,
      );
      showAlert(
        "error",
        "Failed to send email verification link. Please try again.",
      );
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const completeChangeEmail = async (token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await profileService.verifyEmailChange(token);
      showAlert("success", "Email change successful");
      await handleSignOut({ redirect: true });
    } catch (err: any) {
      handleError(
        err,
        "Failed to send reset link. Please try again.",
        setError,
      );
      showAlert("error", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { initiateChangeEmail, completeChangeEmail, isLoading, error };
};
