import React from "react";
import { ErrorMessage } from "formik";
import { Label } from "@/components/ui/label";
import Combobox from "@/components/Combobox";
import { RoomType } from "@/constants/Property";

interface RoomSelectorProps {
  rooms: RoomType[] | undefined;
  value: string;
  onChange: (value: string) => void;
}

const RoomSelector: React.FC<RoomSelectorProps> = ({
  rooms,
  value,
  onChange,
}) => {
  const sortedRooms = rooms
    ?.slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <Label htmlFor="roomId">Room</Label>
      <Combobox
        placeholder="Select Room"
        choices={
          sortedRooms?.map((room) => ({
            label: room.name,
            value: room.id.toString(),
          })) || []
        }
        onSelect={onChange}
        value={value}
        className="w-full"
        noResults="Please select a property first."
      />
      <ErrorMessage
        name="roomId"
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default RoomSelector;
