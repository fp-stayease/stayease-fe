import { config } from "@/constants/url";
import { UserType } from "@/constants/Types";
import { FormikValues } from "formik";
import axiosInterceptor, {
  getAccessToken,
  setAccessToken,
} from "@/utils/axiosInterceptor";
import { queryClient } from "@/lib/queryClient";

export interface AuthResponse {
  id: string;
  email: string;
  userType: string;
  isVerified: boolean;
  firstName: string;
  lastName: string;
  isOAuth2: boolean;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RegisterResponse {
  message: string;
  verificationLink: string;
}

export interface TokenCheckResponse {
  statusCode: number;
  statusMessage: string;
  data: {
    isValid: boolean;
  };
}

export interface SSOResponse {
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  setAccessToken,
  getAccessToken,

  register: async (
    email: string,
    userType: UserType,
  ): Promise<RegisterResponse> => {
    const response = await axiosInterceptor.post(
      config.endpoints.registration.register,
      {
        email,
      },
      { params: { userType } },
    );
    console.log("Calling register endpoint");
    const res = response.data;
    return {
      message: res.data.message,
      verificationLink: res.data.verificationLink,
    };
  },

  checkToken: async (token: string): Promise<TokenCheckResponse> => {
    const response = await axiosInterceptor.post(
      config.endpoints.registration.checkToken,
      { token },
    );
    console.log("Calling check token endpoint, token: ", token);
    return response.data;
  },

  verify: async (values: FormikValues, token: string): Promise<any> => {
    const response = await axiosInterceptor.post(
      config.endpoints.registration.verify,
      values,
      { params: { token }, headers: { "Content-Type": "application/json" } },
    );
    console.log("Calling verify endpoint, response: ", response);
    return response.data;
  },

  exchangeCodeForTokens: async (code: string): Promise<AuthResponse> => {
    const response = await axiosInterceptor.post(
      config.endpoints.oauth2.exchangeCode,
      { code },
    );
    console.log("Exchanging code for tokens: ", response);
    const res = response.data;
    authService.setAccessToken(res.data.accessToken);
    return res;
  },

  selectUserType: async (userType: UserType): Promise<AuthResponse> => {
    const response = await axiosInterceptor.post(
      config.endpoints.oauth2.socialUserSelect,
      { userType },
    );
    console.log("Selecting user type: ", response);
    const res = response.data;
    authService.setAccessToken(res.data.accessToken);
    return res;
  },

  login: async (
    values: FormikValues,
    isOAuth = false,
    isNew = false,
  ): Promise<AuthResponse> => {
    let res;
    try {
      if (isOAuth) {
        res = await authService.exchangeCodeForTokens(values.code);
        console.log("OAuth2 Login flow initiated");
      } else if (isNew) {
        res = await authService.selectUserType(values.userType);
        console.log("New user login flow initiated");
      } else {
        const response = await axiosInterceptor.post(
          config.endpoints.auth.login,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        res = response.data;
        console.log("Normal login flow initiated");
      }
      console.log("Login response:", res);
      if (res.data && res.data.token && res.data.token.accessToken) {
        authService.setAccessToken(res.data.token.accessToken);
        return {
          id: res.data.id,
          email: res.data.email,
          userType: res.data.userType,
          isVerified: res.data.isVerified,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          isOAuth2: res.data.isOAuth2,
          token: {
            accessToken: res.data.token.accessToken,
            refreshToken: res.data.token.refreshToken,
          },
        };
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  checkAuthStatus: async (): Promise<AuthResponse> => {
    console.log("Checking auth status", Math.random().toFixed(5));
    const token = authService.getAccessToken();
    if (token) {
      authService.setAccessToken(token);
      console.log("Checking auth status with token:", token);
    }
    const response = await axiosInterceptor.get(config.endpoints.auth.status);
    console.log("Calling auth status endpoint");
    const res = response.data;
    const serializableData = {
      id: res.data.id,
      email: res.data.email,
      userType: res.data.userType,
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      isOAuth2: res.data.isOAuth2,
      isVerified: res.data.isVerified,
    };
    queryClient.setQueryData(["auth"], serializableData);
    if (queryClient.getQueryData(["auth"]) == serializableData) {
      console.log("Auth status set in query client");
    } else {
      console.log("????????");
    }
    console.log(
      "Set auth status in query client:",
      queryClient.getQueryData(["auth"]),
    );
    console.log("Auth status response:", res);
    return {
      id: res.data.id,
      email: res.data.email,
      userType: res.data.userType,
      isVerified: res.data.isVerified,
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      isOAuth2: res.data.isOAuth2,
      token: {
        accessToken: res.data.token.accessToken,
        refreshToken: res.data.token.refreshToken,
      },
    };
  },

  exchangeGoogleCodeForTokens: async (code: string): Promise<SSOResponse> => {
    try {
      const response = await axiosInterceptor.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/login/oauth2/code/google`,
        { code },
      );
      const { accessToken, refreshToken } = response.data;
      authService.setAccessToken(accessToken);
      return response.data;
    } catch (error) {
      console.error("Token exchange failed:", error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    await axiosInterceptor.post(config.endpoints.auth.logout);
    authService.setAccessToken(null);
  },
};

export default authService;
