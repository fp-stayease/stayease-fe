"use client";

import {usePropertiesSelect} from "@/hooks/reports/usePropertiesReport";
import {useReportParams} from "@/hooks/reports/useReportParams";
import {useQueryClient} from "@tanstack/react-query";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import ListLoading from "@/components/ListLoading";

const PropertySelect = () => {
    const queryClient = useQueryClient();
    const {
        propertyList,
        isLoading,
        error
    } = usePropertiesSelect();
    const {reportParams, handleParamsChange} = useReportParams();

    const handleSelect = (propertyId: string) => {
        handleParamsChange({propertyId: +propertyId});
        queryClient.invalidateQueries({queryKey: ["get-daily-sales"]});
    };

    const placeholder = reportParams.propertyId ?
        reportParams.propertyId : "Select Property";
    return (
        <Select onValueChange={handleSelect}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} className="text-blue-950 capitalize" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel className="text-blue-950">Select Property</SelectLabel>
                    {
                        isLoading && !propertyList && (
                            <ListLoading />
                        )
                    }
                    {
                        propertyList && (
                            propertyList.map((property, i) => (
                                <SelectItem key={i} value={property.id.toString()}>
                                    { property.propertyName }
                                </SelectItem>
                            ))
                        )
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default PropertySelect;