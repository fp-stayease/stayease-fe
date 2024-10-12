import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomSelect from "@/components/CustomSelect";
import { ManualRateForm } from "./ManualRateForm";
import { AutomaticRateForm } from "./AutomaticRateForm";
import { RateResponseType } from "@/constants/Rates";
import { useTenantProperties } from "@/hooks/properties/useTenantProperties";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRatesManagement } from "@/hooks/rates/useRatesManagement";

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
    () => {
      onClose();
    },
    isEditing ? selectedRate?.propertySummary.propertyId : undefined,
  );

  const propertyOptions =
    properties?.map((property) => ({
      value: property.id.toString(),
      label: property.propertyName,
    })) || [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-blue-950">
          {isEditing ? "Edit Rate" : "Set New Rate"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2 mb-4">
            <CustomSelect
              title="Select Property"
              options={propertyOptions}
              onChange={handlePropertyChange}
              value={selectedPropertyId?.toString()}
              disabled={isEditing}
            />
            {error && <p className="text-left text-red-600 text-sm">{error}</p>}
          </div>
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
              />
            </TabsContent>
            <TabsContent value="auto">
              <AutomaticRateForm
                onSubmit={handleAutoSubmit}
                onClose={onClose}
                initialData={autoRateSetting || undefined}
                propertyId={selectedPropertyId ?? 0}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};
