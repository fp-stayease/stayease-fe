import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CurrencyInput from "@/components/CurrencyInput";

interface AdjustmentRateInputProps {
  name: string;
  label: string;
  value: number | null;
  onChange: (name: string, value: number | null) => void;
  adjustmentType: string;
  placeholder?: string;
}

const AdjustmentRateInput: React.FC<AdjustmentRateInputProps> = ({
  name,
  label,
  value,
  onChange,
  adjustmentType,
  placeholder,
}) => {
  if (adjustmentType === "PERCENTAGE") {
    return (
      <div>
        <Label htmlFor={name}>{label}</Label>
        <div className="relative">
          <Input
            placeholder={placeholder || "Input percentage..."}
            id={name}
            name={name}
            type="number"
            value={value !== null ? value : ""}
            onChange={(e) =>
              onChange(name, e.target.value ? parseFloat(e.target.value) : null)
            }
            className="pr-8"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
            %
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <CurrencyInput
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }
};

export default AdjustmentRateInput;
