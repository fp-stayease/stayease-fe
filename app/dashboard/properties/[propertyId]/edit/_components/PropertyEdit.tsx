import React from "react";
import GlobalLoading from "@/components/GlobalLoading";
import { usePropertyData } from "@/hooks/properties/usePropertyData";
import ErrorComponent from "@/components/ErrorComponent";
import PropertyForm from "../../../create/_components/property-forms/PropertyForm";
import { usePropertyEdit } from "@/hooks/properties/usePropertyEdit";
import { createPropValidationSchema } from "@/constants/PropertyValidationSchema";
import { useCategoryManagement } from "@/hooks/properties/useCategoryManagement";

interface PropertyEditProps {
  propertyId: number;
}

const PropertyEdit: React.FC<PropertyEditProps> = ({ propertyId }) => {
  const { propertyById, isLoading, error } = usePropertyData(propertyId);
  const { handleSubmit, isLoading: submitLoading } =
    usePropertyEdit(propertyId);
  const { findCategoryId } = useCategoryManagement();

  if (isLoading || submitLoading) {
    return (
      <div className="flex items-center justify-center align-middle h-[200px]">
        <GlobalLoading fullPage />
      </div>
    );
  }

  if (error) return <ErrorComponent message={error} />;

  const initialValues = {
    property: {
      name: propertyById?.propertyName ?? "",
      description: propertyById?.description ?? "",
      imageUrl: propertyById?.imageUrl ?? "",
      address: propertyById?.address ?? "",
      city: propertyById?.city ?? "",
      country: propertyById?.country ?? "",
      latitude: propertyById?.latitude ?? 0,
      longitude: propertyById?.longitude ?? 0,
      categoryId: findCategoryId(propertyById?.category || "") ?? 0,
      ...propertyById,
    },
    rooms: propertyById?.rooms ?? [],
    category: {
      name: propertyById?.category ?? "",
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-950">Edit Property</h1>
      <PropertyForm
        initialValues={initialValues}
        validationSchema={createPropValidationSchema}
        onSubmit={handleSubmit}
        isEditing={true}
        propertyId={propertyId}
      />
    </div>
  );
};

export default PropertyEdit;
