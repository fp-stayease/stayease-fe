import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ManualRateForm } from "./ManualRateForm";
import { AutomaticRateForm } from "./AutomaticRateForm";
import { RateResponseType } from "@/constants/Rates";
import { useTenantProperties } from "@/hooks/properties/useTenantProperties";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRatesManagement } from "@/hooks/rates/useRatesManagement";
import { Formik, Form } from "formik";
import PropertySelector from "@/app/dashboard/room-availability/_components/PropertySelector";

interface RatesManagementProps {
  isEditing: boolean;
  selectedRate?: RateResponseType;
  onClose: () => void;
}

export const RatesManagement: React.FC<RatesManagementProps> = ({
  isEditing,
  selectedRate,
  onClose,
}) => {
  const { properties } = useTenantProperties();
  const {
    selectedPropertyId,
    error,
    autoRateSetting,
    isLoading,
    handlePropertyChange,
    handleManualSubmit,
    handleAutoSubmit,
  } = useRatesManagement(
    onClose,
    isEditing ? selectedRate?.propertySummary.propertyId : undefined,
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-blue-950">
          {isEditing ? "Edit Rate" : "Set New Rate"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Formik
            initialValues={{ propertyId: selectedPropertyId?.toString() || "" }}
            onSubmit={() => {}}
          >
            <Form>
              <div className="flex flex-col space-y-2 mb-4">
                <PropertySelector
                  properties={properties}
                  value={selectedPropertyId?.toString() || ""}
                  onChange={handlePropertyChange}
                />
              </div>
            </Form>
          </Formik>
          <Tabs defaultValue="manual">
            <TabsList>
              <TabsTrigger value="manual">Manual Rate</TabsTrigger>
              <TabsTrigger value="auto">Automatic Rate</TabsTrigger>
            </TabsList>
            <TabsContent value="manual">
              <ManualRateForm
                onSubmit={(data) =>
                  handleManualSubmit(data, isEditing, selectedRate?.rateId)
                }
                initialData={
                  isEditing && selectedRate
                    ? {
                        startDate: new Date(selectedRate.startDate),
                        endDate: new Date(selectedRate.endDate),
                        adjustmentRate: selectedRate.adjustmentRate,
                        adjustmentType: selectedRate.adjustmentType,
                        reason: selectedRate.reason,
                      }
                    : undefined
                }
                isLoading={isLoading}
                isEditing={isEditing}
                selectedPropertyId={selectedPropertyId}
                error={error}
              />
            </TabsContent>
            <TabsContent value="auto">
              <AutomaticRateForm
                onSubmit={handleAutoSubmit}
                onClose={onClose}
                initialData={autoRateSetting || undefined}
                propertyId={selectedPropertyId ?? 0}
                isLoading={isLoading}
                error={error}
              />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};
