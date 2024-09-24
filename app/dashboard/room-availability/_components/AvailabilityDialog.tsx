import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AvailabilityForm from "@/app/dashboard/room-availability/_components/AvailabilityForm";

interface AvailabilityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (roomId: number, startDate: Date, endDate: Date) => void;
  preSelectedDates?: { start: Date; end: Date } | null;
}

const AvailabilityDialog: React.FC<AvailabilityDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  preSelectedDates,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Room Availability</DialogTitle>
        </DialogHeader>
        <AvailabilityForm
          onSubmit={onSubmit}
          preSelectedDates={preSelectedDates}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AvailabilityDialog;
