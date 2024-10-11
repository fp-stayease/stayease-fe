import * as yup from "yup";
import { whiteSpaceRegex } from "@/constants/WhiteSpaceRegex";
import { FormType } from "@/constants/Types";
import { UserType } from "@/hooks/auth/useSelectUserType";

// Common validation schemas
const emailSchema = yup
  .string()
  .email("Please enter a valid email")
  .required("Please enter your email");

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character",
    )
    .matches(whiteSpaceRegex, "Please enter a valid password")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

// Authentication related schemas
export const loginSchema = yup.object().shape({
  email: emailSchema,
  password: yup
    .string()
    .min(8, "Please enter a valid password")
    .required("Please enter your password")
    .matches(whiteSpaceRegex, "Please enter a valid password"),
});

export const registerSchema = yup.object().shape({
  email: emailSchema,
});

export const verifyValidationSchema = (userType: UserType) => [
  yup.object().shape({ ...passwordSchema.fields }),
  yup.object({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    phoneNumber: yup.string(),
  }),
  userType === "TENANT"
    ? yup.object({
        businessName: yup.string().required("Required"),
        taxId: yup.string(),
      })
    : yup.object({}),
];

export const userTypeSelectSchema = yup.object().shape({
  userType: yup
    .string()
    .oneOf(["USER", "TENANT"])
    .required("User type is required"),
  businessName: yup.string().when("userType", {
    is: (val: UserType) => val === "TENANT",
    then: (schema) => schema.required("Business name is required for tenants"),
    otherwise: (schema) => schema.nullable(),
  }),
  taxId: yup.string().nullable(),
});

// Contact form schema
export const contactFormValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: emailSchema,
  message: yup
    .string()
    .required("Message is required")
    .min(255, "Message must be at least 25 characters")
    .max(1000, "Message must not exceed 1000 characters"),
});

// Helper function to get validation schema based on form type
export const getValidationSchema = (formType: FormType) => {
  switch (formType) {
    case "login":
      return loginSchema;
    case "register":
      return registerSchema;
    case "userType":
      return userTypeSelectSchema;
    case "forgotPassword":
      return passwordSchema;
    default:
      return registerSchema;
  }
};
