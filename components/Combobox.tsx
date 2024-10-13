"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  placeholder: string;
  choices: {
    value: string;
    label: string;
  }[];
  onSelect: (value: string) => void;
  value?: string;
  className?: string;
}

const Combobox: React.FC<ComboboxProps> = ({
  placeholder,
  choices,
  onSelect,
  value: externalValue,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(externalValue || "");

  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(externalValue);
    }
  }, [externalValue]);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === internalValue ? "" : currentValue;
    setInternalValue(newValue);
    onSelect(newValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full text-left font-normal flex justify-between text-muted-foreground"
        >
          {internalValue
            ? choices.find((choice) => choice.value === internalValue)?.label
            : placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${className ? className : "w-[200px] p-0"}`}>
        <Command>
          <CommandInput placeholder="Search choice..." className="h-9" />
          <CommandList>
            <CommandEmpty>No choice found.</CommandEmpty>
            <CommandGroup>
              {choices.map((choice) => (
                <CommandItem
                  key={choice.value}
                  value={choice.value}
                  onSelect={handleSelect}
                >
                  {choice.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
