"use client";
import React from "react";
import StatusGrid from "@/app/dashboard/(user)/_components/StatusGrid";
import UpcomingTrips from "@/app/dashboard/(user)/_components/UpcomingTrips";
import QuickActions from "@/app/dashboard/(user)/_components/QuickActions";
import { CalendarDays, Home } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import ProfileCard from "@/app/dashboard/(user)/_components/ProfileCard";
import GlobalLoading from "@/components/GlobalLoading";
import ErrorComponent from "@/components/ErrorComponent";
import { useUserStats } from "@/hooks/reports/useUserStats";
import { userDashboardActions } from "@/constants/Routes";

const UserDashboard: React.FC = () => {
  const { profile, isLoading, error } = useProfile();
  const { userStats } = useUserStats();

  if (!profile)
    return (
      <div className="flex items-center justify-center align-middle h-[200px]">
        <GlobalLoading height={100} width={100} />
      </div>
    );

  if (error) {
    return <ErrorComponent message={error.message} fullPage />;
  }

  const stats = [
    { icon: Home, label: "Upcoming Trips", value: userStats?.upcomingTrips },
    { icon: CalendarDays, label: "Past Stays", value: userStats?.pastStays },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-950">
        Welcome, {profile.firstName}!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProfileCard user={profile} className="col-span-1 md:col-span-3" />
        <StatusGrid
          stats={stats}
          className="col-span-1 md:col-span-3"
          title="Travel Overview"
        />
        <UpcomingTrips className="col-span-1 md:col-span-2" />
        <QuickActions
          actions={userDashboardActions}
          className="col-span-1 md:col-span-2"
        />
      </div>
    </div>
  );
};

export default UserDashboard;
