"use client";
import React from "react";
import { createPropValidationSchema } from "@/constants/PropertyValidationSchema";
import { createPropertyInitialValues } from "@/constants/PropertyInitialValues";
import GlobalLoading from "@/components/GlobalLoading";
import ErrorComponent from "@/components/ErrorComponent";
import PropertyForm from "./property-forms/PropertyForm";
import { usePropertyCreation } from "@/hooks/properties/usePropertyCreation";

const CreateProperty: React.FC = () => {
  const { isLoading, error, handleSubmit } = usePropertyCreation();

  if (isLoading) return <GlobalLoading fullPage />;

  if (error) return <ErrorComponent message={error} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-950">
        Create New Property
      </h1>
      <PropertyForm
        initialValues={createPropertyInitialValues}
        validationSchema={createPropValidationSchema}
        onSubmit={handleSubmit}
        isEditing={false}
      />
    </div>
  );
};

export default CreateProperty;
