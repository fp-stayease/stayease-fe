import { config } from "@/constants/url";
import { UserType } from "@/constants/Types";
import axiosInterceptor from "@/utils/axiosInterceptor";
import {
  AuthResponse,
  RefreshResponse,
  RegisterResponse,
  TokenCheckResponse,
} from "@/constants/Auth";

import logger from "@/utils/logger";
import { FormikValues } from "formik";
import { logError } from "@/utils/errorHandler";

export const authService = {
  register: async (
    email: string,
    userType: UserType,
  ): Promise<RegisterResponse> => {
    try {
      logger.info("Initiating registration", { email, userType });
      const response = await axiosInterceptor.post(
        config.endpoints.registration.register,
        { email },
        { params: { userType } },
      );
      logger.info("Registration successful", { email });
      return {
        message: response.data.data.message,
        verificationLink: response.data.data.verificationLink,
      };
    } catch (error: any) {
      logger.error("Registration failed", { error, email });
      logError(error);
      throw error;
    }
  },

  checkToken: async (token: string): Promise<TokenCheckResponse> => {
    try {
      const response = await axiosInterceptor.post(
        config.endpoints.registration.checkToken,
        { token },
      );
      return response.data;
    } catch (error: any) {
      logger.error("Error checking token", { error });
      return error.response.data;
    }
  },

  verify: async (values: FormikValues, token: string): Promise<any> => {
    const response = await axiosInterceptor.post(
      config.endpoints.registration.verify,
      values,
      { params: { token }, headers: { "Content-Type": "application/json" } },
    );
    return response.data;
  },
  login: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    try {
      logger.info("Initiating login", { email });
      const response = await axiosInterceptor.post(
        config.endpoints.auth.login,
        { email, password },
      );
      logger.info("Login successful", { email });
      return response.data.data;
    } catch (error: any) {
      logger.error("Login failed", { error, email });
      throw error;
    }
  },
  isAccessTokenNearExpiry: (token: any): boolean => {
    if (!token || !token.accessToken) return true;
    try {
      const decoded = JSON.parse(atob(token.accessToken.split(".")[1]));
      return decoded.exp * 1000 < Date.now() + 5 * 60 * 1000;
    } catch (error) {
      logger.error("Error decoding accessToken", { error });
      return true;
    }
  },

  refreshBothTokens: async (refreshToken: string): Promise<RefreshResponse> => {
    try {
      logger.info("Refreshing both tokens");
      const response = await axiosInterceptor.post(
        config.endpoints.auth.refreshToken,
        { token: refreshToken },
      );
      logger.info("Both tokens refreshed successfully");
      return response.data.data;
    } catch (error: any) {
      logger.error("Error refreshing both tokens", { error });
      throw error;
    }
  },

  refreshAccessToken: async (
    refreshToken: string,
  ): Promise<RefreshResponse> => {
    try {
      logger.info("Refreshing access token");
      const response = await axiosInterceptor.post(
        config.endpoints.auth.refreshAccessToken,
        { token: refreshToken },
      );
      logger.info("Access token refreshed successfully");
      return response.data.data;
    } catch (error: any) {
      logger.error("Error refreshing access token", { error });
      throw error;
    }
  },

  logout: async (email: string | undefined): Promise<void> => {
    try {
      logger.info("Logging out user");
      await axiosInterceptor.post(config.endpoints.auth.logout, { email });
      logger.info("Logout successful");
    } catch (error: any) {
      logger.error("Logout failed", { error });
      throw error;
    }
  },
};

export default authService;
