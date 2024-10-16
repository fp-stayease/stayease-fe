"use client";
import React, { useState } from "react";
import { UserType } from "@/constants/Types";
import { Form, Formik, FormikHelpers } from "formik";
import FormikInput from "@/components/FormikInput";
import { Button } from "@/components/ui/button";
import { useVerifyAccount } from "@/hooks/auth/useVerifyAccount";
import BackToHomeButton from "@/app/(auth)/_components/BackToHomeButton";
import { verifyValidationSchema } from "@/constants/ValidationSchema";
import LoadingButton from "@/components/LoadingButton";
import ErrorComponent from "@/components/ErrorComponent";

export interface MultiStepFormValues {
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  businessName: string;
  taxId: string;
}

interface MultiStepFormProps {
  userType: UserType;
  token: string;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ userType, token }) => {
  const [step, setStep] = useState(1);
  const { handleMultiStepSubmit, isLoading, error } = useVerifyAccount();

  const initialValues = {
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    businessName: "",
    taxId: "",
  };

  const handleSubmit = async (
    values: MultiStepFormValues,
    actions: FormikHelpers<MultiStepFormValues>,
  ) => {
    if (step < (userType === "TENANT" ? 4 : 3)) {
      setStep(step + 1);
      actions.setSubmitting(false);
    } else {
      await handleMultiStepSubmit(values, token, actions);
    }
  };

  if (error) return <ErrorComponent message={error} fullPage />;

  const renderStep = (values: MultiStepFormValues) => {
    switch (step) {
      case 1:
        return (
          <>
            <FormikInput
              as="input"
              name="password"
              className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
              label="Password"
              type="password"
            />
            <FormikInput
              as="input"
              name="confirmPassword"
              className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
              label="Confirm Password"
              type="password"
            />
          </>
        );
      case 2:
        return (
          <>
            <FormikInput
              as="input"
              name="firstName"
              className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
              label="First Name"
            />
            <FormikInput
              as="input"
              name="lastName"
              className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
              label="Last Name"
            />
            <FormikInput
              as="input"
              name="phoneNumber"
              className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
              label="Phone Number (optional)"
            />
          </>
        );
      case 3:
        if (userType === "TENANT") {
          return (
            <>
              <FormikInput
                as="input"
                name="businessName"
                className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
                label="Business Name"
              />
              <FormikInput
                as="input"
                name="taxId"
                className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
                label="Tax ID (optional)"
              />
            </>
          );
        }
      // If not tenant, fall through to summary page
      case 4:
        return (
          <div className="w-full space-y-4">
            <h2 className="text-xl font-bold">Summary</h2>
            <p>
              <strong>First Name:</strong> {values.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {values.lastName}
            </p>
            <p>
              <strong>Phone Number:</strong>{" "}
              {values.phoneNumber || "Not provided"}
            </p>
            {userType === "TENANT" && (
              <>
                <p>
                  <strong>Business Name:</strong>{" "}
                  {values.businessName || "Not provided"}
                </p>
                <p>
                  <strong>Tax ID:</strong> {values.taxId || "Not provided"}
                </p>
              </>
            )}
            <p className="text-sm text-gray-500 text-center">
              Please review your information. If everything is correct, click
              &apos;Submit&apos; to complete your registration.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={verifyValidationSchema(userType)[step - 1]}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty, isSubmitting, values }) => (
        <Form className="space-y-7 w-full flex flex-col justify-center">
          <div>
            <h1 className="text-xl font-semibold text-blue-950 text-center">
              Complete your registration!
            </h1>
          </div>
          <div className="flex justify-center gap-7 mb-4">
            {[1, 2, 3, 4]
              .slice(0, userType === "TENANT" ? 4 : 3)
              .map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === stepNumber
                      ? "bg-blue-950 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {stepNumber}
                </div>
              ))}
          </div>
          <div className="w-full flex flex-col gap-4">{renderStep(values)}</div>
          <div className="flex justify-between mt-6">
            {step === (userType === "TENANT" ? 4 : 3) &&
            (isLoading || isSubmitting) ? (
              <LoadingButton title="Submitting..." />
            ) : (
              <>
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    variant="outline"
                    className="bg-blue-950 w-1/2 text-white text-center"
                    disabled={!(isValid && dirty) || isSubmitting}
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  className="bg-blue-950 w-1/2 text-white mx-auto"
                  disabled={!(isValid && dirty) || isSubmitting}
                >
                  {step === (userType === "TENANT" ? 4 : 3) ? "Submit" : "Next"}
                </Button>
              </>
            )}
          </div>
          <BackToHomeButton />
        </Form>
      )}
    </Formik>
  );
};

export default MultiStepForm;
