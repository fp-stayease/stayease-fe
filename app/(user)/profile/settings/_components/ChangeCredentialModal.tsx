import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormikInput from "@/components/FormikInput";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { useChangeEmail } from "@/hooks/auth/useChangeEmail";
import LoadingButton from "@/components/LoadingButton";
import { useSession } from "next-auth/react";
import logger from "@/utils/logger";

interface ChangeCredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPasswordReset: boolean;
}

const ChangeCredentialModal: React.FC<ChangeCredentialModalProps> = ({
  isOpen,
  onClose,
  isPasswordReset,
}) => {
  const { data: session } = useSession();
  const {
    forgotPassword,
    isLoading: passwordLoading,
    error: passwordError,
  } = useForgotPassword();
  const {
    initiateChangeEmail,
    isLoading: emailLoading,
    error: emailError,
  } = useChangeEmail();

  const isLoading = passwordLoading || emailLoading;
  const error = passwordError || emailError;

  const handleSubmit = async (values: { email: string }) => {
    try {
      const res = isPasswordReset
        ? await forgotPassword(session ? undefined : values.email)
        : await initiateChangeEmail(values.email);

      if (res?.success) {
        onClose();
      }
    } catch (err) {
      logger.error("Error submitting form:", { err });
    }
  };

  const validationSchema = yup.object().shape({
    email:
      isPasswordReset && session
        ? yup.string()
        : yup.string().email("Invalid email").required("Required"),
  });

  const modalTitle = isPasswordReset ? "Reset Password" : "Change E-mail";
  const buttonText = isPasswordReset
    ? "Send Reset Link"
    : "Send E-mail Verification Link";
  const emailPlaceholder = isPasswordReset
    ? "Enter your email"
    : "Enter new email";

  const showEmailInput = !session || !isPasswordReset;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {showEmailInput && (
                <FormikInput
                  name="email"
                  type="email"
                  placeholder={emailPlaceholder}
                  className="w-full p-2 border rounded"
                />
              )}
              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
              {isLoading || isSubmitting ? (
                <LoadingButton title="Sending request..." />
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-blue-950 text-white hover:bg-blue-900"
                >
                  {buttonText}
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeCredentialModal;
