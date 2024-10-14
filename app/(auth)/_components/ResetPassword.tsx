import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { Button } from "@/components/ui/button";
import { getValidationSchema } from "@/constants/ValidationSchema";
import FormInputs from "@/app/(auth)/_components/FormInputs";
import LoadingButton from "@/components/LoadingButton";

interface ResetPasswordProps {
  token: string;
}
const ResetPassword: React.FC<ResetPasswordProps> = ({ token }) => {
  const router = useRouter();
  const { resetPassword, isLoading, error } = useForgotPassword();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold text-blue-950 mb-4 text-center">
        Reset Password
      </h1>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={getValidationSchema("forgotPassword")}
        onSubmit={async (values, { setSubmitting }) => {
          await resetPassword(token as string, values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <FormInputs formType="forgotPassword" />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {isSubmitting || isLoading ? (
              <LoadingButton title="Resetting password..." />
            ) : (
              <Button
                type="submit"
                className="w-full bg-blue-950 text-white hover:bg-blue-900"
              >
                Reset Password
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
