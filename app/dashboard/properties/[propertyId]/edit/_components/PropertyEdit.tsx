import React from "react";
import PropertyEditForm from "./PropertyEditForm";
import GlobalLoading from "@/components/GlobalLoading";
import { usePropertyData } from "@/hooks/properties/usePropertyData";
import ErrorComponent from "@/components/ErrorComponent";

interface PropertyEditProps {
  propertyId: number;
}
const PropertyEdit: React.FC<PropertyEditProps> = ({ propertyId }) => {
  const { propertyById, isLoading, error } = usePropertyData(propertyId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center align-middle h-[200px]">
        <GlobalLoading height={100} width={100} />
      </div>
    );
  }

  if (error) return <ErrorComponent message={error.message} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-950">Edit Property</h1>
      <PropertyEditForm property={propertyById} />
    </div>
  );
};

export default PropertyEdit;
