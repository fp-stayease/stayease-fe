import React, { useState } from "react";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AutoRateRequestType, AutoRateResponseType } from "@/constants/Rates";
import { Switch } from "@/components/ui/switch";
import { autoRateSettingValidationSchema } from "@/constants/ValidationSchema";
import RateDeleteDialog from "@/app/dashboard/rates/_components/RateDeleteDialog";
import TypeSelect from "@/app/dashboard/rates/_components/setting/TypeSelect";

export const typeItems = [
  { value: "PERCENTAGE", label: "Percentage" },
  { value: "FIXED", label: "Fixed Amount" },
];

interface AutomaticRateFormProps {
  onClose: () => void;
  onSubmit: (data: AutoRateRequestType) => void;
  initialData?: AutoRateResponseType;
  propertyId: number;
}

export const AutomaticRateForm: React.FC<AutomaticRateFormProps> = ({
  onClose,
  onSubmit,
  initialData,
  propertyId,
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
        {({ values, setFieldValue }) => (
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
                    <Label htmlFor="holidayAdjustmentRate">
                      Holiday Adjustment Rate
                    </Label>
                    <Field name="holidayAdjustmentRate">
                      {({ field }: FieldProps) => (
                        <Input
                          {...field}
                          type="number"
                          value={field.value === null ? "" : field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? null
                                : Number(e.target.value);
                            setFieldValue("holidayAdjustmentRate", value);
                          }}
                        />
                      )}
                    </Field>
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
                    <Label htmlFor="longWeekendAdjustmentRate">
                      Long Weekend Adjustment Rate
                    </Label>
                    <Field name="longWeekendAdjustmentRate">
                      {({ field }: FieldProps) => (
                        <Input
                          {...field}
                          type="number"
                          value={field.value === null ? "" : field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? null
                                : Number(e.target.value);
                            setFieldValue("longWeekendAdjustmentRate", value);
                          }}
                        />
                      )}
                    </Field>
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
            {initialData && !values.useAutoRates ? (
              <RateDeleteDialog
                propertyId={propertyId}
                onConfirm={handleConfirmDisable}
                title="Confirm Disable Auto Rates"
                description="Are you sure you want to disable automatic rate adjustments? This will remove all current auto rate settings."
                trigger={
                  <Button variant="destructive" className="w-full">
                    Disable Automatic Rates
                  </Button>
                }
              />
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
