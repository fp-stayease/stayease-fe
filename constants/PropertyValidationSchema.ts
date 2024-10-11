import * as yup from "yup";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

// Property related schemas
export const createPropValidationSchema = yup.object().shape({
  property: yup.object().shape({
    name: yup.string().required("Required"),
    description: yup.string().required("Required"),
    imageUrl: yup.string().required("Required"),
    address: yup.string().required("Required"),
    city: yup.string().required("Required"),
    country: yup
      .string()
      .oneOf(["Indonesia"], "Must be in Indonesia")
      .required("Required"),
    longitude: yup.number().required("Required"),
    latitude: yup.number().required("Required"),
    categoryId: yup.string().required("Required"),
  }),
  rooms: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Required"),
      description: yup.string().required("Required"),
      basePrice: yup.number().required("Required").positive("Must be positive"),
      capacity: yup
        .number()
        .required("Required")
        .positive("Must be positive")
        .integer("Must be an integer"),
      imageUrl: yup.string().required("Required"),
    }),
  ),
  category: yup.object().shape({
    name: yup.string(),
  }),
});

// Room availability schema
export const roomAvailabilityValidationSchema = yup.object().shape({
  propertyId: yup.string().required("Property is required"),
  roomId: yup.string().required("Room is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date must be after start date")
    .required("End date is required"),
});

// Rate related schemas
export const manualRateValidationSchema = yup.object().shape({
  startDate: yup
    .date()
    .required("Start date is required")
    .min(tomorrow, "Start date must be after today"),
  endDate: yup
    .date()
    .required("End date is required")
    .min(yup.ref("startDate"), "End date must be after start date"),

  adjustmentRate: yup
    .number()
    .required("Adjustment rate is required")
    .moreThan(0, "Must be more than 0")
    // Adjusting the condition for percentage cap if adjustmentType is PERCENTAGE
    .when("adjustmentType", {
      is: "PERCENTAGE",
      then: (schema) => schema.max(100, "Percentage cannot exceed 100"),
    }),

  adjustmentType: yup
    .string()
    .oneOf(["PERCENTAGE", "FIXED"], "Invalid adjustment type")
    .required("Adjustment type is required"),

  reason: yup
    .string()
    .required("Reason is required")
    .min(5, "Reason must be at least 5 characters")
    // Custom test to disallow the word "automatic"
    .test(
      "not-including-automatic",
      `Reason cannot include the word "Automatic"`,
      function (value) {
        const forbiddenReasons = /\bautomatic\b/i;
        return !forbiddenReasons.test(value);
      },
    ),
});

export const editManualRateValidationSchema = yup.object().shape({
  endDate: yup
    .date()
    .required("End date is required")
    .min(yup.ref("startDate"), "End date must be after start date"),
  adjustmentRate: yup
    .number()
    .required("Adjustment rate is required")
    .moreThan(0, "Must be more than 0")
    // Adjusting the condition for percentage cap if adjustmentType is PERCENTAGE
    .when("adjustmentType", {
      is: "PERCENTAGE",
      then: (schema) => schema.max(100, "Percentage cannot exceed 100"),
    }),
  adjustmentType: yup
    .string()
    .oneOf(["PERCENTAGE", "FIXED"], "Invalid adjustment type")
    .required("Adjustment type is required"),
  reason: yup
    .string()
    .required("Reason is required")
    .min(5, "Reason must be at least 5 characters")
    .test(
      "not-including-automatic",
      `Reason cannot include the word "Automatic"`,
      function (value) {
        const forbiddenReasons = /\bautomatic\b/i;
        return !forbiddenReasons.test(value);
      },
    ),
});

export const autoRateSettingValidationSchema = yup.object().shape({
  useAutoRates: yup.boolean(),

  // Holiday Adjustment Rate
  holidayAdjustmentRate: yup
    .number()
    .nullable()
    .when("useAutoRates", {
      is: true,
      then: (schema) =>
        schema
          .min(0, "Must be a positive number or empty")
          .test(
            "rate-required",
            "At least one of Holiday or Long Weekend rate is required",
            function (value) {
              const { longWeekendAdjustmentRate } = this.parent;
              return value != null || longWeekendAdjustmentRate != null;
            },
          ),
      otherwise: (schema) => schema.strip(),
    })
    .test("percentage-limit", "Percentage cannot exceed 100", function (value) {
      const { holidayAdjustmentType } = this.parent;
      return !(
        holidayAdjustmentType === "PERCENTAGE" &&
        value != null &&
        value > 100
      );
    }),

  // Holiday Adjustment Type
  holidayAdjustmentType: yup
    .string()
    .nullable()
    .when("holidayAdjustmentRate", {
      is: (val: number | null) => val !== null && val > 0,
      then: (schema) =>
        schema.required("Holiday adjustment type is required when rate is set"),
      otherwise: (schema) => schema.nullable(),
    }),

  // Long Weekend Adjustment Rate
  longWeekendAdjustmentRate: yup
    .number()
    .nullable()
    .when("useAutoRates", {
      is: true,
      then: (schema) =>
        schema
          .min(0, "Must be a positive number or empty")
          .test(
            "rate-required",
            "At least one of Holiday or Long Weekend rate is required",
            function (value) {
              const { holidayAdjustmentRate } = this.parent;
              return value != null || holidayAdjustmentRate != null;
            },
          ),
      otherwise: (schema) => schema.strip(),
    })
    .test("percentage-limit", "Percentage cannot exceed 100", function (value) {
      const { longWeekendAdjustmentType } = this.parent;
      return !(
        longWeekendAdjustmentType === "PERCENTAGE" &&
        value != null &&
        value > 100
      );
    }),

  // Long Weekend Adjustment Type
  longWeekendAdjustmentType: yup
    .string()
    .nullable()
    .when("longWeekendAdjustmentRate", {
      is: (val: number | null) => val !== null && val > 0,
      then: (schema) =>
        schema.required(
          "Long weekend adjustment type is required when rate is set",
        ),
      otherwise: (schema) => schema.nullable(),
    }),
});

// Custom test to ensure at least one of the rates is set
autoRateSettingValidationSchema.test(
  "at-least-one-rate-required",
  "At least one of Holiday or Long Weekend rate must be set when auto rate is enabled",
  function (values) {
    if (values.useAutoRates) {
      const holidayRate = values.holidayAdjustmentRate ?? 0;
      const longWeekendRate = values.longWeekendAdjustmentRate ?? 0;

      // If both rates are 0 or null, return false
      return holidayRate > 0 || longWeekendRate > 0;
    }
    return true; // If useAutoRates is false, this test passes
  },
);
