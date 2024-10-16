"use client";
import { useState } from "react";
import { FormikHelpers } from "formik";
import propertyService from "@/services/propertyService";
import { useAlert } from "@/context/AlertContext";
import { useQueryClient } from "@tanstack/react-query";

interface Category {
  id: number;
  name: string;
}

type FormValues = {
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
  rooms: {
    name: string;
    description: string;
    basePrice: number;
    capacity: number;
    imageUrl: string;
  }[];
  category: {
    name: string;
  };
};

export const usePropertyCreation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showAlert } = useAlert();

  const queryClient = useQueryClient();
  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      // Step 1: Create property (image already uploaded)
      const propertyData = {
        ...values.property,
        categoryId: Number(values.property.categoryId),
        longitude: Number(values.property.longitude),
        latitude: Number(values.property.latitude),
      };
      const newPropertyId = await createProperty(propertyData);
      await createRooms(newPropertyId, values.rooms);

      formikHelpers.setSubmitting(false);
      showAlert(
        "success",
        "Property and rooms created successfully",
        "/dashboard/properties",
      );
      await queryClient.invalidateQueries();
    } catch (error) {
      setError("Failed to create property and rooms");
      console.error("Error submitting form:", error);
      formikHelpers.setSubmitting(false);
      showAlert(
        "error",
        "Failed to create property and rooms",
        "/dashboard/properties",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleSubmit,
  };
};

const createProperty = async (propertyData: FormValues["property"]) => {
  const propertyResponse = await propertyService.createProperty(propertyData);
  return propertyResponse.id;
};

const createRooms = async (propertyId: number, rooms: FormValues["rooms"]) => {
  for (const room of rooms) {
    try {
      await propertyService.createRoom(propertyId, room);
    } catch (error) {
      console.error(`Error creating room:`, error);
      throw new Error(`Failed to create room: ${room.name}`);
    }
  }
};
