"use client";

import {useState} from 'react';
import { Button } from "@/components/ui/button";
import {useBookingValues} from "@/hooks/transactions/useBookingValues";
import DatePicker from "@/components/DatePicker";

const BookingDateInfo = () => {
    const [edit, setEdit] = useState<boolean>(false);
    const { bookingValues, setBookingInfo, save } = useBookingValues();
    const { checkInDate, checkOutDate } = bookingValues;

    const handleClick = () => {
        if (edit) {
            save();
            setEdit(false);
        } else {
            setEdit(true);
        }
    }
    return (
        <div className="w-full flex flex-col gap-2">
            <h1 className="text-blue-950 text-sm">Dates</h1>
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col md:flex-row items-center gap-1">
                    <DatePicker name="checkInDate" label="Check-in" value={checkInDate} onChange={setBookingInfo} isEditing={edit} />
                    -
                    <DatePicker name="checkOutDate" label="Check-in" value={checkOutDate} onChange={setBookingInfo} isEditing={edit} />
                </div>
                <Button
                    type="button"
                    variant="link"
                    onClick={handleClick}
                    className="text-blue-950"
                >
                    {edit ? "Save" : "Edit"}
                </Button>
            </div>
        </div>
    );
};

export default BookingDateInfo;