import React from "react";
import { ErrorMessage, Field, FieldProps } from "formik";
import { Label } from "@/components/ui/label";
import { CustomDatePicker } from "@/components/CustomDatePicker";

interface DateSelectorProps {
  name: string;
  label: string;
  value: string;
  onChange: (date: Date | undefined) => void;
  minDate: Date;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  name,
  label,
  value,
  onChange,
  minDate,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <CustomDatePicker
            title={`Select ${label.toLowerCase()}`}
            date={field.value ? new Date(field.value) : undefined}
            onDateChange={onChange}
            minDate={minDate}
            open={isOpen}
            setOpen={setIsOpen}
          />
        )}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default DateSelector;
