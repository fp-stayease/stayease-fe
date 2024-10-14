"use client";

import PropertyRevenueCard from "@/app/dashboard/reports/_components/properties-content/PropertyRevenueCard";
import TaxCard from "@/app/dashboard/reports/_components/properties-content/TaxCard";
import {usePropertiesSales} from "@/hooks/reports/usePropertiesReport";
import {useReportParams} from "@/hooks/reports/useReportParams";
import ListLoading from "@/components/ListLoading";

const RevenueTaxSection = () => {
    const {reportParams} = useReportParams();
    const {
        propertiesSales,
        propertiesSalesIsLoading,
        propertiesSalesError
    } = usePropertiesSales(reportParams);

    if (propertiesSalesIsLoading) return <ListLoading />
    if (propertiesSalesError) return <>Something went wrong... </>
    if (!propertiesSales) return <p className="text-gray-500 text-xl">No data available</p>

    return (
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <PropertyRevenueCard revenue={propertiesSales.revenue} />
            <TaxCard tax={propertiesSales.tax} />
        </div>
    );
};

export default RevenueTaxSection;