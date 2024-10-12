"use client";
import React, { useState } from "react";
import { useRoomAvailability } from "@/hooks/reports/useRoomAvailability";
import AvailabilityDialog from "./AvailabilityDialog";
import { Button } from "@/components/ui/button";
import RoomAvailabilityCalendar from "@/app/dashboard/room-availability/_components/RoomAvailabilityCalendar";
import ConfirmationDialog from "@/app/dashboard/room-availability/_components/ConfirmationDialog";
import { useAlert } from "@/context/AlertContext";
import GlobalLoading from "@/components/GlobalLoading";
import InstructionPopover from "@/app/dashboard/room-availability/_components/CalendarInstruction";
import ErrorComponent from "@/components/ErrorComponent";

const RoomAvailability: React.FC = () => {
  const {
    availabilityData,
    isLoading,
    error,
    setAvailability,
    removeAvailability,
  } = useRoomAvailability();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const { showAlert } = useAlert();

  const handleDateSelect = (start: Date, end: Date) => {
    setSelectedDates({ start, end });
    setIsDialogOpen(true);
  };

  const handleSubmitNewAvailability = (
    roomId: number,
    startDate: Date,
    endDate: Date,
  ) => {
    setAvailability(roomId, startDate, endDate);
    setIsDialogOpen(false);
  };

  const handleEventClick = (event: any) => {
    if (event.extendedProps.isManual) {
      setSelectedEvent(event);
      setIsConfirmDialogOpen(true);
    } else {
      showAlert(
        "warn",
        "This unavailability cannot be removed as it's not manually set.",
      );
    }
  };

  const handleConfirmRemove = () => {
    if (selectedEvent) {
      removeAvailability(
        selectedEvent.extendedProps.roomId,
        parseInt(selectedEvent.id),
      );
    }
    setIsConfirmDialogOpen(false);
    setSelectedEvent(null);
  };

  if (!availabilityData || isLoading) {
    return <GlobalLoading height={100} width={100} />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-950">Room Availability</h1>
        <InstructionPopover />
      </div>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="bg-blue-950 text-appgray hover:bg-gray-400 hover:text-blue-950 my-5"
      >
        Set Availability
      </Button>
      <RoomAvailabilityCalendar
        availabilityData={availabilityData}
        onDateSelect={handleDateSelect}
        onEventClick={handleEventClick}
      />
      <AvailabilityDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmitNewAvailability}
        preSelectedDates={selectedDates}
      />
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleConfirmRemove}
        title="Remove Unavailability"
        description="Are you sure you want to remove this unavailability?"
      />
    </div>
  );
};

export default RoomAvailability;
