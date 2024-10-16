import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { contactFormValidationSchema } from "@/constants/ValidationSchema";

const sanitizeInput = (input: string) => {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
};

const ContactForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    // Sanitize inputs
    const sanitizedValues = {
      fullName: sanitizeInput(values.fullName),
      email: sanitizeInput(values.email),
      message: sanitizeInput(values.message),
    };

    setIsDialogOpen(true);
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="bg-blue-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Have questions or doubts?
        </h2>
        <p className="text-xl text-gray-300 mb-8 text-center">
          Don&apos;t Hesitate, Contact Us
        </p>
        <Formik
          initialValues={{ fullName: "", email: "", message: "" }}
          validationSchema={contactFormValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="fullName"
                  as={Input}
                  placeholder="Full Name"
                  className="bg-white"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <Field
                  name="email"
                  as={Input}
                  type="email"
                  placeholder="Email"
                  className="bg-white"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <Field
                  name="message"
                  as={Textarea}
                  placeholder="Enter your Question..."
                  className="bg-white"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-white text-blue-950 hover:bg-gray-100"
                disabled={isSubmitting || !dirty || !isValid}
              >
                Send
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Received</DialogTitle>
            <DialogDescription>
              Thank you for reaching out. We&apos;ve received your message and
              will contact you back soon.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactForm;
