"use client";
import { RoomAvailabilityProvider } from "@/context/RoomAvailabilityContext";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <RoomAvailabilityProvider>{children}</RoomAvailabilityProvider>;
};

export default DashboardLayout;
