import { useState, useEffect, useMemo, useCallback } from "react";
import { isBefore, isToday } from "date-fns";
import { formatDate } from "@/utils/dateFormatter";

export const useManualRateForm = (isEditing: boolean, initialData?: any) => {
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);

  const { today, tomorrow } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return { today, tomorrow };
  }, []);

  const [minStartDate, setMinStartDate] = useState(tomorrow);
  const [minEndDate, setMinEndDate] = useState(
    new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000),
  );

  useEffect(() => {
    if (isEditing && initialData) {
      const startDate = new Date(initialData.startDate);
      if (startDate <= today) {
        setMinStartDate(startDate);
      }
    }
  }, [isEditing, initialData, today]);

  const handleStartDateChange = (
    date: Date | undefined,
    setFieldValue: any,
  ) => {
    setIsStartDateOpen(false);
    if (date) {
      setFieldValue("startDate", formatDate(date));
      const newMinEndDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      setMinEndDate(newMinEndDate);
      setFieldValue("endDate", formatDate(newMinEndDate));
      setIsEndDateOpen(true);
    }
  };

  const handleEndDateChange = (date: Date | undefined, setFieldValue: any) => {
    setIsEndDateOpen(false);
    if (date) {
      setFieldValue("endDate", formatDate(date));
    }
  };

  const isStartDateDisabled = useCallback(
    (startDate: Date, isEditing: boolean) => {
      return isEditing && (isBefore(startDate, today) || isToday(startDate));
    },
    [today],
  );

  return {
    isStartDateOpen,
    setIsStartDateOpen,
    isEndDateOpen,
    setIsEndDateOpen,
    minStartDate,
    minEndDate,
    handleStartDateChange,
    handleEndDateChange,
    isStartDateDisabled,
  };
};
