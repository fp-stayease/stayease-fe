import { useCallback, useEffect, useState } from "react";
import authService from "@/services/authService";
import { FormType } from "@/constants/Types";
import { profileService } from "@/services/profileService";
import { passwordService } from "@/services/passwordService";
import logger from "@/utils/logger";

export const useCheckToken = ({
  formType,
  token,
}: {
  formType: FormType;
  token: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  const checkService =
    formType === "changeEmail"
      ? profileService.checkEmailChangeToken
      : formType === "forgotPassword"
        ? passwordService.checkPasswordToken
        : authService.checkToken;

  const checkIsTokenValid = useCallback(async () => {
    if (!token) return;
    setIsTokenValid(null); // Reset the state
    setIsLoading(true);
    try {
      const response = await checkService(token);
      setIsTokenValid(response.data);
    } catch (error: any) {
      logger.error(error);
      setError(error);
      setIsTokenValid(false);
    } finally {
      setIsLoading(false);
    }
  }, [token, checkService]);

  useEffect(() => {
    checkIsTokenValid();
  }, [token, checkIsTokenValid]);

  return { isLoading, error, isTokenValid };
};
