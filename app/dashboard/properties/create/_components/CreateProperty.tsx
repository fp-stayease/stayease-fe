"use client";
import { FieldArray, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPropValidationSchema } from "@/utils/validationSchema";
import PropertyForm from "@/app/dashboard/properties/create/_components/PropertyForm";
import RoomForm from "@/app/dashboard/properties/create/_components/RoomForm";
import { usePropertyCreation } from "@/hooks/usePropertyCreation";

const CreateProperty = () => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const {
    categories,
    setCategories,
    isLoading,
    error,
    fetchCategories,
    handleSubmit,
    handleImageUpload,
  } = usePropertyCreation();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const initialValues = {
    property: {
      name: "",
      description: "",
      imageUrl: "",
      address: "",
      city: "",
      country: "",
      longitude: 0,
      latitude: 0,
      categoryId: 0,
    },
    rooms: [
      {
        name: "",
        description: "",
        basePrice: 0,
        capacity: 0,
        imageUrl: "",
      },
    ],
    category: {
      name: "",
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Property</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={createPropValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className="flex flex-col">
            <PropertyForm
              onImageUpload={handleImageUpload}
              categories={categories}
              setCategories={setCategories}
            />
            <FieldArray name="rooms">
              {({ push, remove }) => (
                <>
                  {values.rooms.map((room, index) => (
                    <RoomForm
                      key={index}
                      index={index}
                      onImageUpload={handleImageUpload}
                      onRemove={() => remove(index)}
                    />
                  ))}
                  <div className="grid md:grid-cols-7">
                    <Button
                      type="button"
                      onClick={() =>
                        push({
                          name: "",
                          description: "",
                          basePrice: 0,
                          capacity: 0,
                          imageUrl: "",
                        })
                      }
                      className="md:col-span-1"
                    >
                      Add Room
                    </Button>
                  </div>
                </>
              )}
            </FieldArray>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 bg-blue-950 hover:bg-gray-100 hover:text-blue-950"
            >
              Submit Property
            </Button>
          </Form>
        )}
      </Formik>
      <Link
        href="/dashboard/properties"
        className="mt-4 inline-block text-blue-500 hover:underline"
      >
        Back to Properties
      </Link>
    </div>
  );
};

export default CreateProperty;
