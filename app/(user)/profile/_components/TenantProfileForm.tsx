import React from "react";
import { Form, Formik } from "formik";
import ProfileFormField from "@/app/(user)/profile/_components/ProfileFormField";
import { TenantProfile } from "@/constants/Users";
import { Button } from "@/components/ui/button";

interface TenantProfileFormProps {
  tenantInfo: TenantProfile;
  isEditing: boolean;
  toggleEditing: () => void;
  updateTenantProfile: (values: Partial<TenantProfile>) => void;
}

const TenantProfileForm: React.FC<TenantProfileFormProps> = ({
  tenantInfo,
  isEditing,
  toggleEditing,
  updateTenantProfile,
}) => {
  return (
    <Formik
      initialValues={tenantInfo}
      onSubmit={(values) => {
        updateTenantProfile(values);
      }}
      enableReinitialize
    >
      {({ values }) => (
        <Form>
          <p className="text-xl font-bold mb-4">Tenant Details</p>
          {Object.keys(tenantInfo).map((key) => {
            const label = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())
              .replace("Tax Id", "Tax ID");
            return (
              <ProfileFormField
                key={key}
                label={label}
                type="text"
                id={key}
                name={key}
                disabled={key === "registeredDate" || !isEditing}
                values={values}
                isEditing={isEditing}
              />
            );
          })}
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={toggleEditing}
              className={`${isEditing ? "bg-appcancel hover:text-appcancel hover:bg-[#FAFAFA]" : "bg-blue-950"} hover:bg-[#FAFAFA] hover:text-blue-950 text-white font-bold px-4 py-2 rounded`}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            {isEditing && (
              <Button
                type="submit"
                className="bg-green-800 hover:bg-[#FAFAFA] hover:text-green-800 font-bold text-white px-4 py-2 rounded"
              >
                Save Changes
              </Button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TenantProfileForm;
