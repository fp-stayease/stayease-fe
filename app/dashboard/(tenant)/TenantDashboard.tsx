import React from "react";
import StatusGrid from "@/app/dashboard/(user)/_components/StatusGrid";
import PropertyManagement from "@/app/dashboard/(tenant)/_components/PropertyManagement";
import QuickActions from "@/app/dashboard/(user)/_components/QuickActions";
import { useProfile } from "@/context/ProfileContext";
import ProfileCard from "@/app/dashboard/(user)/_components/ProfileCard";
import { DashboardRatesSummary } from "@/app/dashboard/(tenant)/_components/RatesSummary";
import GlobalLoading from "@/components/GlobalLoading";
import ErrorComponent from "@/components/ErrorComponent";
import { useReportStats } from "@/hooks/reports/useReportStats";
import { tenantDashboardActions } from "@/constants/Routes";

const TenantDashboard: React.FC = () => {
  const { profile, isLoading, error } = useProfile();
  const { statsList } = useReportStats();

  if (!profile)
    return (
      <div className="flex items-center justify-center align-middle h-[200px]">
        <GlobalLoading height={100} width={100} />
      </div>
    );

  if (error) {
    return <ErrorComponent message={error.message} fullPage />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-950">
        Welcome, {profile.tenantInfo?.businessName}!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ProfileCard className="col-span-1" user={profile} />
        <StatusGrid
          className="col-span-1 md:col-span-2"
          stats={statsList}
          title="Performance Overview"
        />
        <QuickActions
          actions={tenantDashboardActions}
          className="col-span-1 md:col-span-1"
        />
        <DashboardRatesSummary className="w-full col-span-1 md:col-span-2" />
        <PropertyManagement className="col-span-1 md:col-span-2" />
      </div>
    </div>
  );
};

export default TenantDashboard;
