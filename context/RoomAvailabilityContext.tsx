// src/context/RoomAvailabilityContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { TenantRoomAvailability } from "@/constants/RoomAvailability";
import { useRoomAvailability } from "@/hooks/reports/useRoomAvailability";

interface RoomAvailabilityContextType {
  availabilityData: TenantRoomAvailability[] | undefined;
  isLoading: boolean;
  dataLoading: boolean;
  error: string | null;
  dataError: Error | null;
  setAvailability: (
    roomId: number,
    startDate: Date,
    endDate: Date,
  ) => Promise<boolean>;
  removeAvailability: (roomId: number, availabilityId: number) => Promise<void>;
  clearError: () => void;
}

const RoomAvailabilityContext = createContext<
  RoomAvailabilityContextType | undefined
>(undefined);

export const useRoomAvailabilityContext = () => {
  const context = useContext(RoomAvailabilityContext);
  if (context === undefined) {
    throw new Error(
      "useRoomAvailabilityContext must be used within a RoomAvailabilityProvider",
    );
  }
  return context;
};

export const RoomAvailabilityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    availabilityData,
    isLoading,
    dataLoading,
    error,
    dataError,
    setAvailability,
    removeAvailability,
    clearError,
  } = useRoomAvailability();

  return (
    <RoomAvailabilityContext.Provider
      value={{
        availabilityData,
        isLoading,
        dataLoading,
        error,
        dataError,
        setAvailability,
        removeAvailability,
        clearError,
      }}
    >
      {children}
    </RoomAvailabilityContext.Provider>
  );
};
