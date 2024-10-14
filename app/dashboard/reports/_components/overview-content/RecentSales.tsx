"use client";

import {useRecentTrx} from "@/hooks/reports/useOverviewReports";
import UserSalesCard from "@/app/dashboard/reports/_components/overview-content/UserSalesCard";
import ListLoading from "@/components/ListLoading";

export function RecentSales() {
    const {
        recentTrx,
        recentTrxIsLoading,
        recentTrxError
    } = useRecentTrx();

    if (recentTrxIsLoading) return <ListLoading />
    if (recentTrxError) return <>Something went wrong</>
    if (!recentTrx) return <p className="text-gray-500">No data available</p>

    return (
        <div className="space-y-8">
            {
                recentTrx.map((trx, i) => (
                    <UserSalesCard key={i} trx={trx} />
                ))
            }
        </div>
    )
}