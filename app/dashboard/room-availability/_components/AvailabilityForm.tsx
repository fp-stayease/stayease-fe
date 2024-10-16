import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/dateFormatter";
import { usePropertyData } from "@/hooks/properties/usePropertyData";
import { useTenantProperties } from "@/hooks/properties/useTenantProperties";
import { roomAvailabilityValidationSchema } from "@/constants/PropertyValidationSchema";
import { useRoomAvailabilityContext } from "@/context/RoomAvailabilityContext";
import LoadingButton from "@/components/LoadingButton";
import PropertySelector from "./PropertySelector";
import RoomSelector from "./RoomSelector";
import DateSelector from "./DateSelector";

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
          <PropertySelector
            properties={properties}
            value={values.propertyId}
            onChange={(value) => {
              setSelectedPropertyId(value);
              setFieldValue("propertyId", value);
              setFieldValue("roomId", "");
            }}
          />

          <RoomSelector
            rooms={propertyById?.rooms || undefined}
            value={values.roomId}
            onChange={(value) => setFieldValue("roomId", value)}
          />

          <DateSelector
            name="startDate"
            label="Start Date"
            value={values.startDate}
            onChange={(date) => {
              if (date) {
                setIsStartDateOpen(false);
                setFieldValue("startDate", formatDate(date));
                setIsEndDateOpen(true);
              }
            }}
            minDate={minDate}
            isOpen={isStartDateOpen}
            setIsOpen={setIsStartDateOpen}
          />

          <DateSelector
            name="endDate"
            label="End Date"
            value={values.endDate}
            onChange={(date) => {
              if (date) {
                setIsEndDateOpen(false);
                setFieldValue("endDate", formatDate(date));
              }
            }}
            minDate={endMinDate}
            isOpen={isEndDateOpen}
            setIsOpen={setIsEndDateOpen}
          />

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
