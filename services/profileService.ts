import { config } from "@/constants/url";
import axiosInterceptor from "@/utils/axiosInterceptor";
import logger from "@/utils/logger";
import { TokenCheckResponse } from "@/constants/Auth";
import {
  TenantProfile,
  UpdateProfile,
  UserImage,
  UserImageResponse,
  UserProfile,
} from "@/constants/Users";

const transformUserProfile = (res: any): UserProfile => ({
  id: res.data.id,
  email: res.data.email,
  firstName: res.data.firstName,
  lastName: res.data.lastName,
  phoneNumber: res.data.phoneNumber ?? "",
  avatarUrl: res.data.avatarUrl ?? "",
  joinedAt: new Date(res.data.joinedAt),
  userType: res.data.userType,
  tenantInfo: res.data.tenantInfo && {
    businessName: res.data.tenantInfo.businessName ?? "",
    taxId: res.data.tenantInfo.taxId ?? "",
    registeredDate: new Date(res.data.tenantInfo.registrationDate),
  },
});

export const profileService = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await axiosInterceptor.get<UserProfile>(
      config.endpoints.users.profile,
    );
    return transformUserProfile(response.data);
  },

  updateProfile: async (
    values: Partial<UpdateProfile>,
  ): Promise<UserProfile> => {
    const response = await axiosInterceptor.put<UserProfile>(
      config.endpoints.users.profile,
      values,
    );
    return transformUserProfile(response.data);
  },

  updateTenantProfile: async (
    values: Partial<TenantProfile>,
  ): Promise<UserProfile> => {
    try {
      const response = await axiosInterceptor.put<UserProfile>(
        config.endpoints.users.tenant,
        values,
      );
      return transformUserProfile(response.data);
    } catch (error: any) {
      logger.error("Failed to update tenant profile", { error });
      throw error.response.data;
    }
  },

  uploadAvatar: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axiosInterceptor.post<UserImageResponse>(
      config.endpoints.users.avatar,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data.data.avatarUrl;
  },

  setOrRemoveAvatar: async (
    userImage: UserImage | null,
  ): Promise<UserImage> => {
    if (userImage === null) {
      // If userImage is null, send a request to remove the avatar

      await axiosInterceptor.put(config.endpoints.users.avatar);
      return { avatarUrl: "" };
    } else {
      // If userImage is not null, send a request to set the new avatar
      const response = await axiosInterceptor.put<UserImageResponse>(
        config.endpoints.users.avatar,
        { avatarUrl: userImage.avatarUrl },
      );
      if (!response.data || !response.data.data.avatarUrl) {
        throw new Error("Failed to set avatar");
      }
      return {
        avatarUrl: response.data.data.avatarUrl,
      };
    }
  },

  changeEmailRequest: async (newEmail: string): Promise<any> => {
    try {
      logger.info("Requesting email change");
      const response = await axiosInterceptor.post(
        config.endpoints.users.email,
        { newEmail },
      );
      logger.info("Email change request successful");
      return response.data;
    } catch (error: any) {
      logger.error("Email change request failed", { error });
      throw error.response.data.message;
    }
  },

  checkEmailChangeToken: async (token: string): Promise<TokenCheckResponse> => {
    try {
      logger.info("Checking email change token");
      const response = await axiosInterceptor.post(
        config.endpoints.users.checkToken,
        { token },
      );
      logger.info("Email change token is valid");
      return response.data;
    } catch (error: any) {
      logger.error("Email change token is invalid", { error });
      return error.response.data.message;
    }
  },

  verifyEmailChange: async (token: string): Promise<void> => {
    try {
      logger.info("Verifying email change");
      await axiosInterceptor.put(config.endpoints.users.email, null, {
        params: { token },
      });
      logger.info("Email change verification successful");
    } catch (error: any) {
      logger.error("Email change verification failed", { error });
      throw error.response.data.message;
    }
  },

  deleteAccount: async (): Promise<void> => {
    try {
      logger.info("Deleting account");
      await axiosInterceptor.delete(config.endpoints.users.delete);
      logger.info("Account deletion successful");
    } catch (error: any) {
      logger.error("Account deletion failed", { error });
      throw error.response.data.message;
    }
  },
};
