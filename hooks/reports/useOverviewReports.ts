"use client";

import {useQuery} from "@tanstack/react-query";
import {reportService} from "@/services/reportService";

const useOverviewSummary = () => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-overview-summary"],
        queryFn: async () => await reportService.getOverviewSummary()
    });
    return {
        summary: data,
        summaryIsLoading: isLoading,
        summaryError: error
    };
};

const useMonthlySales = () => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-monthly-sales"],
        queryFn: async () => {
            const rawData = await reportService.getMonthlySales();

            return rawData?.map(item => ({
                ...item,
                month: monthNames[item.month - 1]
            }));
        }
    });

    return {
        monthlySales: data,
        monthlySalesIsLoading: isLoading,
        monthlySalesError: error
    };
};

const useRecentTrx = () => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-recent-sales"],
        queryFn: async () => await reportService.getRecentTrx()
    });

    return {
        recentTrx: data,
        recentTrxIsLoading: isLoading,
        recentTrxError: error
    };
};

const useTenantRatings = () => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["get-tenant-ratings"],
        queryFn: async () => await reportService.getTenantRatings()
    });

    return {
        rating: data,
        isLoading,
        error
    }
}

export { useOverviewSummary, useMonthlySales, useRecentTrx, useTenantRatings };