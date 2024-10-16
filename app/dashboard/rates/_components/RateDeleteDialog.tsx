"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import { usePeakSeasonRate } from "@/hooks/rates/usePeakSeasonRate";
import { useAutoRateSetting } from "@/hooks/rates/useAutoRateSetting";
import LoadingButton from "@/components/LoadingButton";
import logger from "@/utils/logger";

interface DeleteDialogProps {
  propertyId?: number;
  rateId?: number;
  onConfirm?: () => void;
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
}

const RateDeleteDialog: FC<DeleteDialogProps> = ({
  propertyId,
  rateId,
  onConfirm,
  title = "Delete Rate Setting",
  description = "Are you sure you want to delete this rate setting?",
  trigger,
}) => {
  const { deleteRate, isLoading } = usePeakSeasonRate();
  const { deactivateAutoRateSetting, isLoading: autoIsLoading } =
    useAutoRateSetting(propertyId ?? 0);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      if (rateId) {
        await deleteRate(rateId);
      } else if (propertyId) {
        await deactivateAutoRateSetting();
      }
      setOpen(false);
      if (onConfirm) {
        onConfirm();
      }
    } catch (error) {
      logger.error("Error deleting rate or deactivating auto rate setting:", {
        error,
      });
    }
  };

  useEffect(() => {
    setOpen((prev) => (open !== undefined ? open : prev));
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {!trigger ? (
          <Button variant="ghost" className="w-10 h-10 p-0">
            <Trash className="w-4 h-4" />
          </Button>
        ) : (
          trigger
        )}
      </DialogTrigger>
      <DialogContent aria-describedby="Delete Dialog">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter>
          {isLoading || autoIsLoading ? (
            <div className="flex justify-end">
              <LoadingButton
                title={rateId ? "Deleting..." : "Deactivating..."}
              />
            </div>
          ) : (
            <>
              <DialogClose asChild>
                <Button variant="link">Cancel</Button>
              </DialogClose>
              <Button className="bg-blue-950" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RateDeleteDialog;
