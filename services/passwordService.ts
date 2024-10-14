import axiosInterceptor from "@/utils/axiosInterceptor";
import { config } from "@/constants/url";
import logger from "@/utils/logger";
import axios from "axios";
import { ForgotPasswordValues, TokenCheckResponse } from "@/constants/Auth";

export const passwordService = {
  forgotPassword: async (email: string, loggedIn: boolean): Promise<any> => {
    try {
      const res = await axiosInterceptor.post(
        config.endpoints.password.forgot,
        { email },
        { params: { loggedIn } },
      );
      logger.info("Forgot password request sent", { email });
      return res.data;
    } catch (error: any) {
      logger.error("Forgot password failed", { error, email });
      throw error;
    }
  },

  checkPasswordToken: async (token: string): Promise<TokenCheckResponse> => {
    try {
      logger.info("Checking password reset token");
      const response = await axiosInterceptor.post(
        config.endpoints.password.checkToken,
        { token },
      );
      logger.info("Password reset token is valid");
      return response.data;
    } catch (error: any) {
      logger.error("Password reset token is invalid", { error });
      return error.response.data;
    }
  },

  resetPassword: async (
    token: string,
    values: ForgotPasswordValues,
  ): Promise<any> => {
    try {
      logger.info("Initiating password reset, values: ", values);
      const res = await axiosInterceptor.post(
        config.endpoints.password.reset,
        values,
        {
          params: { token },
        },
      );
      logger.info("Password reset successful");
      return res.data;
    } catch (error: any) {
      try {
        const response = await axios.post(
          `${config.BASE_URL}${config.endpoints.password.reset}`,
          {
            password: values.password,
            confirmPassword: values.confirmPassword,
          },
          { params: { token } },
        );
        logger.info("Forgot password successful", response.data.data);
        return response.data;
      } catch (error: any) {
        logger.error("Forgot password failed", { error });
        throw error;
      }
    }
  },
};
