// ManualRateForm.tsx
import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RateRequestType } from "@/constants/Rates";
import {
  editManualRateValidationSchema,
  manualRateValidationSchema,
} from "@/constants/PropertyValidationSchema";
import TypeSelect from "@/app/dashboard/rates/_components/setting/TypeSelect";
import { typeItems } from "@/app/dashboard/rates/_components/setting/AutomaticRateForm";
import LoadingButton from "@/components/LoadingButton";
import { DatePickerField } from "./DatePickerField";
import { useManualRateForm } from "@/hooks/rates/useManualRateForm";
import AdjustmentRateInput from "@/app/dashboard/rates/_components/setting/AdjustmentRateInput";

interface ManualRateFormProps {
  onSubmit: (data: RateRequestType) => void;
  initialData?: RateRequestType;
  isLoading: boolean;
  isEditing: boolean;
  selectedPropertyId: number | null;
  error: string | null;
}

export const ManualRateForm: React.FC<ManualRateFormProps> = ({
  onSubmit,
  initialData,
  isLoading,
  isEditing,
  selectedPropertyId,
  error,
}) => {
  const {
    isStartDateOpen,
    setIsStartDateOpen,
    isEndDateOpen,
    setIsEndDateOpen,
    minStartDate,
    minEndDate,
    handleStartDateChange,
    handleEndDateChange,
    isStartDateDisabled,
  } = useManualRateForm(isEditing, initialData);

  const initialValues: RateRequestType = initialData || {
    startDate: null as unknown as Date,
    endDate: null as unknown as Date,
    adjustmentRate: null as unknown as number,
    adjustmentType: null as unknown as string,
    reason: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={
        isEditing ? editManualRateValidationSchema : manualRateValidationSchema
      }
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <DatePickerField
              name="startDate"
              label="Start Date"
              minDate={minStartDate}
              isOpen={isStartDateOpen}
              setIsOpen={setIsStartDateOpen}
              onDateChange={(date) =>
                handleStartDateChange(date, setFieldValue)
              }
              disabled={isStartDateDisabled(
                new Date(values.startDate),
                isEditing,
              )}
              infoText={
                isStartDateDisabled(new Date(values.startDate), isEditing) &&
                isEditing
                  ? "Rate is currently in effect, cannot change start date"
                  : "Minimum start date is tomorrow"
              }
            />
            <DatePickerField
              name="endDate"
              label="End Date"
              minDate={minEndDate}
              isOpen={isEndDateOpen}
              setIsOpen={setIsEndDateOpen}
              onDateChange={(date) => handleEndDateChange(date, setFieldValue)}
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <AdjustmentRateInput
                name="adjustmentRate"
                label="Adjustment Rate"
                value={values.adjustmentRate}
                onChange={(name, value) => setFieldValue(name, value)}
                adjustmentType={values.adjustmentType || ""}
                placeholder="Enter adjustment rate"
              />
              <ErrorMessage
                name="adjustmentRate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex-1">
              <TypeSelect
                name="adjustmentType"
                label="Adjustment Type"
                placeholder="Select type"
                options={typeItems}
              />
            </div>
          </div>
          <div className="flex-1">
            <Label htmlFor="reason">Reason</Label>
            <Field name="reason" as={Input} />
            <ErrorMessage
              name="reason"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          {error && <p className="text-left text-red-600 text-sm">{error}</p>}
          {isLoading || isSubmitting ? (
            <div className="flex justify-end">
              <LoadingButton title="Setting new rate..." />
            </div>
          ) : (
            <Button
              type="submit"
              className="w-full bg-blue-950 text-appgray hover:bg-appgray hover:text-blue-950 mt-5"
              disabled={!selectedPropertyId || isSubmitting}
            >
              {initialData ? "Update Rate" : "Set Rate"}
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};
