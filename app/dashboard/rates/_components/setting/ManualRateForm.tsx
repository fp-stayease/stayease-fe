import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import { RateRequestType } from "@/constants/Rates";
import {
  editManualRateValidationSchema,
  manualRateValidationSchema,
} from "@/constants/PropertyValidationSchema";
import { formatDate } from "@/utils/dateFormatter";
import TypeSelect from "@/app/dashboard/rates/_components/setting/TypeSelect";
import { typeItems } from "@/app/dashboard/rates/_components/setting/AutomaticRateForm";
import LoadingButton from "@/components/LoadingButton";
import { isBefore, isToday } from "date-fns";
import { InfoIcon } from "lucide-react";

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
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);

  const { today, tomorrow } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return { today, tomorrow };
  }, []);

  const [minStartDate, setMinStartDate] = useState(tomorrow);
  const [minEndDate, setMinEndDate] = useState(
    new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000),
  );

  useEffect(() => {
    if (isEditing && initialData) {
      const startDate = new Date(initialData.startDate);
      if (startDate <= today) {
        setMinStartDate(startDate);
      }
    }
  }, [isEditing, initialData, today, tomorrow]);

  const handleStartDateChange = (
    date: Date | undefined,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean,
    ) => void,
  ) => {
    setIsStartDateOpen(false);
    if (date) {
      setFieldValue("startDate", formatDate(date));
      const newMinEndDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      setMinEndDate(newMinEndDate);
      setFieldValue("endDate", formatDate(newMinEndDate));
      setIsEndDateOpen(true);
    }
  };

  const handleEndDateChange = (
    date: Date | undefined,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean,
    ) => void,
  ) => {
    setIsEndDateOpen(false);
    if (date) {
      setFieldValue("endDate", formatDate(date));
    }
  };

  const isStartDateDisabled = useCallback(
    (startDate: Date, isEditing: boolean) => {
      const today = new Date();

      // Disable if editing and if startDate is today or in the past
      return isEditing && (isBefore(startDate, today) || isToday(startDate));
    },
    [],
  );

  const initialValues: RateRequestType = initialData || {
    startDate: null as unknown as Date,
    endDate: null as unknown as Date,
    adjustmentRate: 0,
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
            <div className="flex-1">
              <Label htmlFor="startDate">Start Date</Label>
              <Field name="startDate">
                {({ field, form }: FieldProps) => {
                  // Convert field.value to Date and determine if the field should be disabled
                  const disabled = isStartDateDisabled(
                    new Date(field.value),
                    isEditing,
                  );

                  return (
                    <>
                      <CustomDatePicker
                        title="Select start date"
                        date={field.value}
                        onDateChange={(date) =>
                          handleStartDateChange(date, setFieldValue)
                        }
                        minDate={minStartDate}
                        open={isStartDateOpen}
                        setOpen={setIsStartDateOpen}
                        disabled={disabled}
                      />
                      <div className="ml-1 mt-1 text-gray text-xs items-center flex">
                        <InfoIcon className="text-gray w-3 h-3 mr-1" />
                        {disabled && isEditing ? (
                          <p>
                            Rate is currently in effect, cannot change start
                            date
                          </p>
                        ) : (
                          <p>Minimum start date is tomorrow</p>
                        )}
                      </div>
                    </>
                  );
                }}
              </Field>
              <ErrorMessage
                name="startDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="endDate">End Date</Label>
              <Field name="endDate">
                {({ field }: FieldProps) => (
                  <CustomDatePicker
                    title="Select end date"
                    date={field.value}
                    onDateChange={(date) =>
                      handleEndDateChange(date, setFieldValue)
                    }
                    minDate={minEndDate}
                    open={isEndDateOpen}
                    setOpen={setIsEndDateOpen}
                  />
                )}
              </Field>
              <ErrorMessage
                name="endDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <Label htmlFor="adjustmentRate">Adjustment Rate</Label>
              <Field name="adjustmentRate" as={Input} type="number" />
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
