import React from "react";
import { ErrorMessage, Field, FieldProps } from "formik";
import { Label } from "@/components/ui/label";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import { InfoIcon } from "lucide-react";

interface DatePickerFieldProps {
  name: string;
  label: string;
  minDate: Date;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onDateChange: (date: Date | undefined) => void;
  disabled?: boolean;
  infoText?: string;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  name,
  label,
  minDate,
  isOpen,
  setIsOpen,
  onDateChange,
  disabled = false,
  infoText,
}) => (
  <div className="flex-1">
    <Label htmlFor={name}>{label}</Label>
    <Field name={name}>
      {({ field }: FieldProps) => (
        <>
          <CustomDatePicker
            title={`Select ${label.toLowerCase()}`}
            date={field.value}
            onDateChange={onDateChange}
            minDate={minDate}
            open={isOpen}
            setOpen={setIsOpen}
            disabled={disabled}
          />
          {infoText && (
            <div className="ml-1 mt-1 text-gray text-xs items-center flex">
              <InfoIcon className="text-gray w-3 h-3 mr-1" />
              <p>{infoText}</p>
            </div>
          )}
        </>
      )}
    </Field>
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm"
    />
  </div>
);
