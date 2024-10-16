import React from "react";
import { ErrorMessage, useFormikContext } from "formik";
import { Label } from "@/components/ui/label";
import Combobox from "@/components/Combobox";
import { PropertyAndRoomType } from "@/constants/Property";

interface PropertySelectorProps {
  properties: PropertyAndRoomType[] | undefined;
  value: string;
  onChange: (value: string) => void;
}

const PropertySelector: React.FC<PropertySelectorProps> = ({
  properties,
  value,
  onChange,
}) => {
  const formik = useFormikContext();
  const sortedProperties = properties
    ?.slice()
    .sort((a, b) => a.propertyName.localeCompare(b.propertyName));

  return (
    <div>
      <Label htmlFor="propertyId">Property</Label>
      <Combobox
        placeholder="Select Property"
        choices={
          sortedProperties?.map((property) => ({
            label: property.propertyName,
            value: property.id.toString(),
          })) || []
        }
        onSelect={onChange}
        value={value}
        className="w-full"
      />
      {formik && (
        <ErrorMessage
          name="propertyId"
          component="div"
          className="text-red-500 text-sm"
        />
      )}
    </div>
  );
};

export default PropertySelector;
