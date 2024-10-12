import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaInfoCircle } from "react-icons/fa";

const InstructionPopover: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="inline-block">
          <FaInfoCircle className="w-5 h-5 text-blue-600 cursor-pointer ml-2" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw-2rem)] max-w-sm sm:max-w-md md:max-w-lg">
        <h3 className="font-semibold mb-2 text-lg">
          Room Availability Calendar
        </h3>
        <p className="text-sm mb-3">
          This calendar displays periods when rooms are{" "}
          <strong>not available</strong> for booking. It shows dates when you
          have marked rooms as unavailable, as well as existing reservations.
          Empty dates indicate available times for booking.
        </p>
        <h4 className="font-semibold mb-1 text-base">
          How to use this calendar:
        </h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>
            Use the &quot;Set Availability&quot; button to set unavailability
            for specific dates.
          </li>
          <li>
            On desktop, you can drag across dates to set a range of
            unavailability.
          </li>
          <li>Click/tap on an existing unavailability to remove it.</li>
          <li>
            Unavailabilities marked as (Booked){" "}
            <strong>cannot be manually removed</strong>.
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default InstructionPopover;
