import React, { useState } from "react";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AutoRateRequestType, AutoRateResponseType } from "@/constants/Rates";
import { Switch } from "@/components/ui/switch";
import { autoRateSettingValidationSchema } from "@/constants/PropertyValidationSchema";
import RateDeleteDialog from "@/app/dashboard/rates/_components/RateDeleteDialog";
import TypeSelect from "@/app/dashboard/rates/_components/setting/TypeSelect";
import LoadingButton from "@/components/LoadingButton";
import AdjustmentRateInput from "@/app/dashboard/rates/_components/setting/AdjustmentRateInput";

export const typeItems = [
  { value: "PERCENTAGE", label: "Percentage" },
  { value: "FIXED", label: "Fixed Amount" },
];

interface AutomaticRateFormProps {
  onClose: () => void;
  onSubmit: (data: AutoRateRequestType) => void;
  initialData?: AutoRateResponseType;
  propertyId: number;
  isLoading: boolean;
  error: string | null;
}

export const AutomaticRateForm: React.FC<AutomaticRateFormProps> = ({
  onClose,
  onSubmit,
  initialData,
  propertyId,
  isLoading,
  error,
}) => {
  const [formValues, setFormValues] = useState<AutoRateRequestType | null>(
    null,
  );

  const initialValues: AutoRateRequestType = {
    useAutoRates: initialData?.useAutoRates || false,
    holidayAdjustmentRate: initialData?.holidayAdjustmentRate || null,
    holidayAdjustmentType: initialData?.holidayAdjustmentType || null,
    longWeekendAdjustmentRate: initialData?.longWeekendAdjustmentRate || null,
    longWeekendAdjustmentType: initialData?.longWeekendAdjustmentType || null,
  };

  const handleSubmit = (values: AutoRateRequestType) => {
    if (!values.useAutoRates && initialData?.useAutoRates) {
      setFormValues(values);
    } else {
      onSubmit(values);
    }
  };

  const handleConfirmDisable = () => {
    if (formValues) {
      onSubmit(formValues);
    }
    onClose();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={autoRateSettingValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="useAutoRates"
                checked={values.useAutoRates}
                onCheckedChange={(checked) =>
                  setFieldValue("useAutoRates", checked)
                }
              />
              <Label htmlFor="useAutoRates">
                Enable Automatic Rate Adjustment
              </Label>
            </div>

            {values.useAutoRates && (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="flex-1">
                    <AdjustmentRateInput
                      name="holidayAdjustmentRate"
                      label="Holiday Adjustment Rate"
                      value={values.holidayAdjustmentRate || null}
                      onChange={(name, value) => setFieldValue(name, value)}
                      adjustmentType={values.holidayAdjustmentType || ""}
                      placeholder="Enter holiday adjustment rate"
                    />
                    <ErrorMessage
                      name="holidayAdjustmentRate"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <TypeSelect
                      name="holidayAdjustmentType"
                      label="Holiday Adjustment Type"
                      placeholder="Select type"
                      options={typeItems}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="flex-1">
                    <AdjustmentRateInput
                      name="longWeekendAdjustmentRate"
                      label="Long Weekend Adjustment Rate"
                      value={values.longWeekendAdjustmentRate || null}
                      onChange={(name, value) => setFieldValue(name, value)}
                      adjustmentType={values.longWeekendAdjustmentType || ""}
                      placeholder="Enter holiday adjustment rate"
                    />
                    <ErrorMessage
                      name="longWeekendAdjustmentRate"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <TypeSelect
                      name="longWeekendAdjustmentType"
                      label="Long Weekend Adjustment Type"
                      placeholder="Select type"
                      options={typeItems}
                    />
                  </div>
                </div>
              </div>
            )}
            {error && <p className="text-left text-red-600 text-sm">{error}</p>}
            {initialData && !values.useAutoRates ? (
              <RateDeleteDialog
                propertyId={propertyId}
                onConfirm={handleConfirmDisable}
                title="Confirm Deactivate Auto Rates"
                description="Are you sure you want to deactivate automatic rate adjustments for this property? This will remove all current auto rate settings."
                trigger={
                  <Button variant="destructive" className="w-full">
                    Deactivate Automatic Rates
                  </Button>
                }
              />
            ) : isLoading || isSubmitting ? (
              <div className="flex justify-end">
                <LoadingButton title="Setting up automatic rate adjustments..." />
              </div>
            ) : (
              <Button
                type="submit"
                className="w-full bg-blue-950 text-white hover:bg-blue-900"
              >
                Set Automatic Rates
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};
