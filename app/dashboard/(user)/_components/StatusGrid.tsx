import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReportStatsType } from "@/constants/Reports";
import { currencyFormatter } from "@/utils/CurrencyFormatter";

interface StatusGridProps {
  className?: string;
  stats: ReportStatsType[];
  title: string;
}

const StatusGrid: React.FC<StatusGridProps> = ({ className, stats, title }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-blue-950">{title}</CardTitle>
        <CardDescription>Your activity on the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const { icon: Icon } = stat;
            return (
              <div
                key={index}
                className="flex items-center p-4 bg-gray-100 rounded-lg"
              >
                <div className="mr-4">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-blue-950">
                    {stat.label === "Revenue"
                      ? currencyFormatter(stat.value!)
                      : stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusGrid;
