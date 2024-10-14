import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CurrencyInputProps {
  name: string;
  label: string;
  value: number | string;
  onChange: (name: string, value: number) => void;
  placeholder?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  name,
  label,
  value,
  onChange,
  placeholder,
}) => {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    setDisplayValue(formatPrice(value));
  }, [value]);

  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return numPrice.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, "");
    const numericValue = rawValue ? parseInt(rawValue, 10) : 0;
    onChange(name, numericValue);
  };

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <Input
          placeholder={placeholder ? placeholder : "Input price..."}
          id={name}
          name={name}
          type="text"
          value={displayValue}
          onChange={handleChange}
          className="pl-8"
        />
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
          Rp
        </div>
      </div>
    </div>
  );
};

export default CurrencyInput;
