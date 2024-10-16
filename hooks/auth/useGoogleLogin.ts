"use client";
import { useState } from "react";
import { signIn as nextAuthSignIn, useSession } from "next-auth/react";
import { useAlert } from "@/context/AlertContext";
import logger from "@/utils/logger";

export function useGoogleLogin() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const { showAlert } = useAlert();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await nextAuthSignIn("google", { redirect: true });

      if (session?.user?.isNewUser) {
        showAlert(
          "success",
          "Please continue to select your user type.",
          "/register/select-user-type",
        );
      } else {
        showAlert("info", "Redirecting to consent page...");
      }
    } catch (error: any) {
      logger.error("Google login failed:", error);
      showAlert("error", "Google login failed. " + error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    googleLogin: handleGoogleLogin,
  };
}
