"use client";
import React, { useEffect } from "react";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/app/dashboard/properties/create/_components/ImageUpload";
import CategoryDropdown from "@/app/dashboard/properties/create/_components/CategoryDropdown";
import MapComponent from "@/components/MapComponent";

export interface PropertyFormValues {
  property: {
    name: string;
    description: string;
    imageUrl: string;
    address: string;
    city: string;
    country: string;
    longitude: number;
    latitude: number;
    categoryId: number;
  };
}

const propertyFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "description", label: "Description", type: "text" },
  { name: "address", label: "Address", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "country", label: "Country", type: "text" },
];

const PropertyForm: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<PropertyFormValues>();

  const handleLocationChange = (lat: number, lng: number) => {
    setFieldValue("property.latitude", lat);
    setFieldValue("property.longitude", lng);
    console.log("Location changed to:", lat, lng);
  };

  useEffect(() => {
    console.log("Field values:", values);
  }, [setFieldValue, values]);

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Property Details</h2>
      <div className="grid grid-cols-2 gap-4">
        {propertyFields.map((field) => (
          <div key={field.name}>
            <Label htmlFor={`property.${field.name}`}>{field.label}</Label>
            <Field
              name={`property.${field.name}`}
              as={Input}
              type={field.type}
            />
            <ErrorMessage
              name={`property.${field.name}`}
              component="div"
              className="text-red-500"
            />
          </div>
        ))}
        <CategoryDropdown />
      </div>
      <div className="mt-4 mb-10">
        <Label>Location</Label>
        <div style={{ height: "400px", width: "100%" }}>
          <MapComponent
            initialCenter={{
              lat: values.property.latitude || 0,
              lng: values.property.longitude || 0,
            }}
            onLocationChange={handleLocationChange}
            isEditable={true}
            viewOnly={false}
          />
        </div>
        <ErrorMessage
          name="property.latitude"
          component="div"
          className="text-red-500"
        />
        <ErrorMessage
          name="property.longitude"
          component="div"
          className="text-red-500"
        />
      </div>
      <div className="mt-4">
        <Label>Property Image</Label>
        <ImageUpload fieldName="property.imageUrl" uploadType="property" />
      </div>
    </div>
  );
};

export default PropertyForm;
