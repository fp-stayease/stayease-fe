"use client";
import React from "react";
import { Form, Formik } from "formik";
import AlertComponent from "@/components/AlertComponent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormikInput from "@/components/FormikInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useSelectUserType } from "@/hooks/useSelectUserType";

const SelectUserForm: React.FC = () => {
  const {
    initialValues,
    validationSchema,
    handleSubmit,
    alertInfo,
    hideAlert,
  } = useSelectUserType();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-950">
            Select User Type
          </CardTitle>
          <CardDescription className="text-center">
            Choose your account type to complete registration
          </CardDescription>
        </CardHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userType">User Type</Label>
                  <Select
                    onValueChange={(value) => setFieldValue("userType", value)}
                    value={values.userType}
                  >
                    <SelectTrigger id="userType">
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="TENANT">Tenant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {values.userType === "TENANT" && (
                  <>
                    <FormikInput
                      name="businessName"
                      label="Business Name"
                      placeholder="Enter your business name"
                      className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
                    />
                    <FormikInput
                      name="taxId"
                      label="Tax ID (optional)"
                      placeholder="Enter your tax ID"
                      className="w-full border py-1 px-2 rounded-md focus-visible:ring-0"
                    />
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-blue-950 hover:bg-blue-900"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Continue"}
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
      {alertInfo.show && (
        <AlertComponent
          type={alertInfo.type}
          message={alertInfo.message}
          onClose={hideAlert}
        />
      )}
    </div>
  );
};

export default SelectUserForm;
