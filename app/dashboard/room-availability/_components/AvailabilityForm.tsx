import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/dateFormatter";
import CustomSelect from "@/components/CustomSelect";
import { usePropertyData } from "@/hooks/properties/usePropertyData";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import { useTenantProperties } from "@/hooks/properties/useTenantProperties";
import { roomAvailabilityValidationSchema } from "@/constants/PropertyValidationSchema";
import { useRoomAvailabilityContext } from "@/context/RoomAvailabilityContext";
import LoadingButton from "@/components/LoadingButton";

interface AvailabilityFormProps {
  onSubmit: (roomId: number, startDate: Date, endDate: Date) => void;
  preSelectedDates?: { start: Date; end: Date } | null;
}

const AvailabilityForm: React.FC<AvailabilityFormProps> = ({
  onSubmit,
  preSelectedDates,
}) => {
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null,
  );
  const [initialValues, setInitialValues] = useState({
    propertyId: "",
    roomId: "",
    startDate: "",
    endDate: "",
  });
  const { properties } = useTenantProperties();
  const { propertyById } = usePropertyData(
    selectedPropertyId ? parseInt(selectedPropertyId) : 0,
  );
  const { isLoading, error } = useRoomAvailabilityContext();

  useEffect(() => {
    if (preSelectedDates) {
      setInitialValues((prev) => ({
        ...prev,
        startDate: formatDate(preSelectedDates.start),
        endDate: formatDate(preSelectedDates.end),
      }));
    }
  }, [preSelectedDates]);

  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);
  const endMinDate = new Date(minDate.getTime() + 24 * 60 * 60 * 1000);

  const handleStartDateChange = (
    date: Date | undefined,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean,
    ) => void,
  ) => {
    if (date) {
      setIsStartDateOpen(false);
      setFieldValue("startDate", formatDate(date));
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
    if (date) {
      setIsEndDateOpen(false);
      setFieldValue("endDate", formatDate(date));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={roomAvailabilityValidationSchema}
      onSubmit={(values) => {
        onSubmit(
          parseInt(values.roomId),
          new Date(values.startDate),
          new Date(values.endDate),
        );
      }}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-4">
          <div>
            <Label htmlFor="propertyId">Property</Label>
            <CustomSelect
              title="Select Property"
              options={properties?.map((property) => ({
                label: property.propertyName,
                value: property.id.toString(),
              }))}
              onChange={(value) => {
                setSelectedPropertyId(value);
                setFieldValue("propertyId", value);
                setFieldValue("roomId", "");
              }}
              value={values.propertyId}
            />
            <ErrorMessage
              name="propertyId"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="roomId">Room</Label>
            <CustomSelect
              title="Select Room"
              options={propertyById?.rooms?.map((room) => ({
                label: room.name,
                value: room.id.toString(),
              }))}
              onChange={(value) => {
                setFieldValue("roomId", value);
              }}
              value={values.roomId}
              disabled={!values.propertyId}
            />
            <ErrorMessage
              name="roomId"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Field name="startDate">
              {({ field }: FieldProps) => (
                <CustomDatePicker
                  title="Select start date"
                  date={field.value ? new Date(field.value) : undefined}
                  onDateChange={(date) =>
                    handleStartDateChange(date, setFieldValue)
                  }
                  minDate={minDate}
                  open={isStartDateOpen}
                  setOpen={setIsStartDateOpen}
                />
              )}
            </Field>
            <ErrorMessage
              name="startDate"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Field name="endDate">
              {({ field }: FieldProps) => (
                <CustomDatePicker
                  title="Select end date"
                  date={field.value ? new Date(field.value) : undefined}
                  onDateChange={(date) => {
                    handleEndDateChange(date, setFieldValue);
                  }}
                  minDate={endMinDate}
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
          {error && <p className="text-sm text-red-500">{error}</p>}
          {isLoading ? (
            <LoadingButton title="Setting Room as Unavailable.." />
          ) : (
            <Button type="submit" className="bg-blue-950 text-white w-full">
              Set Availability
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default AvailabilityForm;
