"use client";

import RevenueCard from "@/app/dashboard/reports/_components/overview-content/RevenueCard";
import PaidCompleteTrxCard from "@/app/dashboard/reports/_components/overview-content/PaidCompleteTrxCard";
import UsersCard from "@/app/dashboard/reports/_components/overview-content/UsersCard";
import PropertiesCard from "@/app/dashboard/reports/_components/overview-content/PropertiesCard";
import {useOverviewSummary} from "@/hooks/reports/useOverviewReports";
import ListLoading from "@/components/ListLoading";

const SalesSummary = () => {
    const {
        summary,
        summaryIsLoading,
        summaryError
    } = useOverviewSummary();

    if (summaryIsLoading) return <ListLoading/>;
    if (summaryError) return <>Something went wrong</>
    if (!summary) return <p className="text-gray-500">No data available</p>
    return (
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <RevenueCard revenueDiff={summary.revenueDiff}/>
            <PaidCompleteTrxCard trxDiff={summary.trxDiff}/>
            <UsersCard usersDiff={summary.usersDiff}/>
            <PropertiesCard totalProperties={summary.totalProperties}/>
        </div>
    );
};

export default SalesSummary;