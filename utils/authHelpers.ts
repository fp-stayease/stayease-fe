import authService from "@/services/authService";
import logger from "@/utils/logger";
import { AuthResponse } from "@/constants/Auth";
import { oAuth2Service } from "@/services/oAuth2Service";

export async function handleGoogleSignIn({ user, account, profile }: any) {
  if (account?.provider === "google") {
    logger.info("Google sign in initiated", { email: user.email });
    try {
      const userExists = await oAuth2Service.checkUserExists(user.email);
      if (!userExists) {
        user.googleToken = account.id_token;
        user.isNewUser = true;
        logger.info("New Google user, storing OAuth2 info", {
          email: user.email,
        });
        return true;
      }
      if (account.id_token) {
        const authResponse = await oAuth2Service.exchangeCode(account.id_token);
        Object.assign(user, authResponse);
        user.googleToken = undefined;
        user.isNewUser = false;
        logger.info("Existing Google user authenticated", {
          email: user.email,
        });
      }
    } catch (error) {
      logger.error("Error during Google sign in", { error, email: user.email });
      return false;
    }
  }
  return true;
}

export async function handleJwtCallback({
  token,
  user,
  account,
  trigger,
  session,
}: any) {
  if (account && user) {
    logger.debug("JWT callback - user data received", { email: user.email });
    if (user.isNewUser) {
      token.email = user.email;
      token.googleToken = user.googleToken;
      token.isNewUser = true;
    } else {
      Object.assign(token, mapUserToToken(user));
    }
    logger.debug("Token: ", { token });
    return token;
  }

  if (token.accessToken && (await shouldRefreshTokens(token))) {
    logger.info("Token refresh needed", { email: token.email });
    try {
      const refreshedToken = await refreshTokens(token);
      Object.assign(token, refreshedToken);
      logger.info("Token refreshed successfully", { email: token.email });
    } catch (error) {
      logger.error("Token refresh failed", { error, email: token.email });
      return { ...token, error: "RefreshAccessTokenError" };
    }
  }

  if (trigger === "update" && session) {
    mapNewSessionToToken(token, session);
    logger.debug("Token updated from session", { email: token.email });
  }

  return token;
}

export function handleSessionCallback({
  session,
  token,
}: {
  session: any;
  token: any;
}) {
  session.user = mapTokenToSessionUser(token);
  logger.debug("Session callback - session updated", {
    email: session.user.email,
  });
  return session;
}

function mapUserToToken(user: AuthResponse) {
  return {
    sub: user.email,
    id: user.id,
    email: user.email,
    userType: user.userType,
    firstName: user.firstName,
    lastName: user.lastName,
    avatarUrl: user.avatarUrl,
    isVerified: user.isVerified,
    isOAuth2: user.isOAuth2,
    accessToken: user.token?.accessToken,
    refreshToken: user.token?.refreshToken,
    expiresAt: user.token?.expiresAt,
  };
}

function mapTokenToSessionUser(token: any) {
  return {
    id: token.id,
    email: token.email,
    userType: token.userType,
    firstName: token.firstName,
    lastName: token.lastName,
    avatarUrl: token.avatarUrl,
    isVerified: token.isVerified,
    isOAuth2: token.isOAuth2,
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
    expiresAt: token.expiresAt,
    error: token.error,
    googleToken: token.googleToken,
    isNewUser: token.isNewUser,
  };
}

function mapNewSessionToToken(token: any, session: any) {
  Object.assign(token, {
    sub: session.user.email,
    id: session.user.id,
    email: session.user.email,
    userType: session.user.userType,
    firstName: session.user.firstName,
    lastName: session.user.lastName,
    avatarUrl: session.user.avatarUrl,
    isVerified: session.user.isVerified,
    isOAuth2: session.user.isOAuth2,
    accessToken: session.user.accessToken,
    refreshToken: session.user.refreshToken,
    expiresAt: session.user.expiresAt,
    googleToken: session.user.googleToken,
    isNewUser: session.user.isNewUser,
  });
}

async function shouldRefreshTokens(token: any) {
  if (!token.accessToken) return false;
  const isAccessTokenNearExpiry = authService.isAccessTokenNearExpiry(token);
  const isRefreshTokenNearExpiry =
    token.expiresAt && token.expiresAt - Date.now() < 15 * 60 * 1000;
  logger.debug("Token expiry check", {
    isAccessTokenNearExpiry,
    isRefreshTokenNearExpiry,
  });
  return isAccessTokenNearExpiry || isRefreshTokenNearExpiry;
}

async function refreshTokens(token: any) {
  if (!token.refreshToken) {
    throw new Error("No refresh token available");
  }
  const isRefreshTokenNearExpiry =
    token.expiresAt - Date.now() < 15 * 60 * 1000;
  let newTokens;
  if (isRefreshTokenNearExpiry) {
    newTokens = await authService.refreshBothTokens(token.refreshToken);
  } else {
    newTokens = await authService.refreshAccessToken(token.refreshToken);
  }
  return {
    ...token,
    accessToken: newTokens.accessToken,
    refreshToken: newTokens.refreshToken,
    expiresAt: newTokens.expiresAt,
  };
}
