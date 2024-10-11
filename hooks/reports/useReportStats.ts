"use client";

import {ReportStatsType} from "@/constants/Reports";
import {CalendarDays, DollarSign, Home, Star} from "lucide-react";
import {useOverviewSummary, useTenantRatings} from "@/hooks/reports/useOverviewReports";

export const useReportStats = () => {
    const { summary } = useOverviewSummary();
    const { rating } = useTenantRatings();

    const ratingValue = rating ? rating.toFixed(1) : 0;

    const statsList: ReportStatsType[] = [
        { icon: Home, label: "Properties", value: summary?.totalProperties },
        { icon: CalendarDays, label: "Bookings this month", value: summary?.trxDiff.trxThisMonth,},
        { icon: Star, label: "Avg. Rating", value: +ratingValue },
        { icon: DollarSign, label: "Revenue", value: summary?.revenueDiff.revenueThisMonth,}
    ];

  return { statsList }
};