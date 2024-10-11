export const config = {
  BASE_URL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  endpoints: {
    auth: {
      status: "/auth/status",
      login: "/auth/login",
      logout: "/auth/logout",
      refreshToken: "/auth/refresh",
      refreshAccessToken: "/auth/refresh-access",
    },
    oauth2: {
      checkUserExists: "/oauth2/check-user-exists",
      registerOAuth2: "/oauth2/register",
      exchangeCode: "/oauth2/exchange-code",
    },
    password: {
      forgot: "/password/forgot",
      reset: "/password/reset",
      checkToken: "/password/check-token",
    },
    registration: {
      register: "/register",
      checkToken: "/register/check-token",
      verify: "/register/verify",
    },
    users: {
      profile: "/users/profile",
      tenant: "/users/profile/tenant",
      avatar: "/users/profile/avatar",
      email: "/users/profile/email",
      checkToken: "/users/profile/email/check-token",
      delete: "/users",
    },
    properties: {
      getTenantProperties: "/properties/tenant",
      getTenantRooms: "/properties/tenant/rooms",
      createProperty: "/properties",
      updateProperty: "/properties/{propertyId}",
      deleteProperty: "/properties/{propertyId}",
      createRoom: "/properties/{propertyId}/rooms",
      updateRoom: "/properties/{propertyId}/rooms/{roomId}",
      deleteRoom: "/properties/{propertyId}/rooms/{roomId}",
      uploadImage: "/properties/upload-image",
    },
    propertyUtils: {
      getAllProperties: "/properties",
      getProperty: "/properties/{propertyId}",
      getRooms: "/properties/{propertyId}/rooms",
      getRoom: "/properties/{propertyId}/rooms/{roomId}",
      checkPropertyOwnership: "/properties/{propertyId}/check-ownership",
      getCurrentRoom: "/properties/{propertyId}/rooms/{roomId}/available",
      getCurrentAvailableProperty: "/properties/{propertyId}/available",
      getLowestDailyCumulativeRate:
        "/properties/{propertyId}/rates/daily/cumulative",
    },
    propertyListings: {
      sortAndFilter: "/properties/listings",
      getAllAvailablePropertiesOnDate: "/properties/available",
      getAllCities: "/properties/cities",
      getAllImages: "/properties/images",
    },
    categories: {
      getAllCategories: "/categories",
      createCategory: "/categories",
      updateCategory: "/categories/{categoryId}",
      deleteCategory: "/categories/{categoryId}",
    },
    rates: {
      baseRoute: "/rates",
      getLowestDailyRate: "/rates/daily",
      getLowestDailyCumulativeRate: "/rates/daily/cumulative",
      updateRates: "/rates/{rateId}",
      autoUpdateRates: "/rates/auto",
    },
    availability: {
      getTenantAvailability: "/properties/tenant/availability",
      baseRoute: "/properties/availability",
    },
    bookings: {
      tenantBookings: "/bookings/tenant",
      userBookings: "/bookings/user",
    },
    transactions: {
      tenant: "/transactions",
      user: "/transactions/user",
    },
    payments: {
      paymentInfo: "/payments",
      uploadPayment: "/payments/payment-proof",
    },
    reports: {
      availabilityReports: "/properties/tenant/availability",
      overviewReports: "/reports/overview",
      monthlySales: "/reports/overview/monthly-sales",
      recentTrx: "/reports/overview/recent-completed-transactions",
      dailySales: "/reports/properties",
      popularRooms: "/reports/properties/popular",
      propertySales: "/reports/properties/sales",
      userStats: "/reports/user-stats",
      tenantRatings: "/reviews/rating/tenant"
    },
    reviews: {
      userReviews: "/reviews/user",
      tenantReviews: "/reviews/tenant",
      propertyReviews: "/reviews/properties/",
      propertyRating: "/reviews/rating/",
      postUserReviews: "/reviews/",
      updateUserReviews: "/reviews/",
      deleteUserReviews: "/reviews/",
      reviewDetail: "/reviews/",
    },
    replies: {
      replyReview: "/replies/{reviewId}",
      crudReply: "/replies/",
      reviewReplies: "/replies/list/",
    }
  },
};
