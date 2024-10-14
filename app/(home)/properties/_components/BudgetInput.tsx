import React from "react";
import CurrencyInput from "@/components/CurrencyInput";

interface BudgetInputProps {
  minPrice: number;
  maxPrice?: number;
  onChange: (minPrice: number, maxPrice?: number) => void;
}

const BudgetInput: React.FC<BudgetInputProps> = ({
  minPrice,
  maxPrice,
  onChange,
}) => {
  const handleMinChange = (name: string, value: number | null) => {
    onChange(value ?? 0, maxPrice);
  };

  const handleMaxChange = (name: string, value: number | null) => {
    onChange(minPrice, value ?? undefined);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
      <CurrencyInput
        name="minPrice"
        value={minPrice || null}
        onChange={handleMinChange}
        placeholder="Min Price"
      />
      <span className="text-gray-500">to</span>
      <CurrencyInput
        name="maxPrice"
        value={maxPrice || null}
        onChange={handleMaxChange}
        placeholder="Max Price"
      />
    </div>
  );
};

export default BudgetInput;
