import React from "react";
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCategoryManagement } from "@/hooks/properties/useCategoryManagement";
import LoadingButton from "@/components/LoadingButton";
import Combobox from "@/components/Combobox";

interface CategoryDropdownProps {
  initialCategoryId?: number;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  initialCategoryId,
}) => {
  const { setFieldValue, values } = useFormikContext<any>();
  const {
    categories,
    selectedCategory,
    isCreatingNew,
    handleSelectChange,
    handleCreateNewCategory,
    setIsCreatingNew,
    isLoading,
  } = useCategoryManagement(initialCategoryId);

  const categoryChoices = [
    { value: "new", label: "Create new category" },
    ...(categories?.map((category) => ({
      value: category.id.toString(),
      label: category.name,
    })) || []),
  ];

  const onSelectChange = (value: string) => {
    if (value === "new") {
      setIsCreatingNew(true);
    } else {
      handleSelectChange(value);
      setFieldValue("property.categoryId", Number(value));
    }
  };

  const onCreateNew = async () => {
    const categoryName = values.category.name.trim();
    if (categoryName) {
      const newCategory = await handleCreateNewCategory(categoryName);
      if (newCategory) {
        await setFieldValue("property.categoryId", newCategory.id);
      }
    }
  };

  return (
    <div>
      {!isCreatingNew ? (
        <div className="flex flex-col gap-2.5 w-full">
          <Label htmlFor="property.categoryId">Category</Label>
          <div className="w-full">
            <Combobox
              placeholder="Select Category"
              choices={categoryChoices}
              onSelect={onSelectChange}
              value={selectedCategory ? selectedCategory.id.toString() : ""}
              className="w-full p-0"
            />
          </div>
          <ErrorMessage
            name="property.categoryId"
            component="div"
            className="text-red-500"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div>
            <Label htmlFor="category.name">New Category Name</Label>
            <Field name="category.name" as={Input} />
            <ErrorMessage
              name="category.name"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-row gap-3">
            {isLoading ? (
              <LoadingButton title="Creating category.." />
            ) : (
              <>
                <Button
                  type="button"
                  onClick={onCreateNew}
                  className="bg-blue-950 hover:bg-gray-100 hover:text-blue-950"
                >
                  Create
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  className="bg-appcancel hover:bg-appgray hover:text-appcancel"
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
