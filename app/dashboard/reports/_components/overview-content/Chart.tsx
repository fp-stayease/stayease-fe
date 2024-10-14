"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {useMonthlySales} from "@/hooks/reports/useOverviewReports";
import {currencyFormatter} from "@/utils/CurrencyFormatter";
import ListLoading from "@/components/ListLoading";

export function Chart() {
    const {
        monthlySales,
        monthlySalesIsLoading,
        monthlySalesError
    } = useMonthlySales();

    if (monthlySalesIsLoading) return <ListLoading/>
    if (monthlySalesError) return <>Something went wrong</>
    if (!monthlySales) return <p className="text-gray-500">No data available</p>

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlySales}>
                <XAxis
                    dataKey="month"
                    stroke="#172554"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#172554"
                    fontSize={8}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => currencyFormatter(value)}
                />
                <Bar
                    dataKey="totalAmount"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}