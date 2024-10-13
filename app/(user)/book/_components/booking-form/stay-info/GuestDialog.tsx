"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import GuestEditorBtn from "@/app/(user)/book/_components/booking-form/stay-info/GuestEditorBtn";
import {useBookingValues} from "@/hooks/transactions/useBookingValues";

const GuestsDialog = () => {
    const { bookingValues, setBookingInfo, save } = useBookingValues();
    return (
        <Dialog>
            <DialogTrigger className="text-sm font-medium px-4 hover:underline">
                Edit
            </DialogTrigger>
            <DialogContent className="w-80 flex flex-col gap-5 pt-14">
                <DialogHeader>
                    <DialogTitle>Guests?</DialogTitle>
                    <DialogDescription>Please enter guests number</DialogDescription>
                </DialogHeader>
                <GuestEditorBtn label="Adults" description="Age 13+" name="totalAdults" onChange={setBookingInfo} value={bookingValues.totalAdults} />
                <GuestEditorBtn label="Children" description="Ages 2-13" name="totalChildren" onChange={setBookingInfo} value={bookingValues.totalChildren} />
                <GuestEditorBtn label="Infants" description="Under 2" name="totalInfants" onChange={setBookingInfo} value={bookingValues.totalInfants} />
                <DialogFooter className="w-full mt-5 flex justify-between">
                    <DialogClose className="hover:underline text-blue-950 mr-auto">
                        Cancel
                    </DialogClose>
                    <DialogClose className="bg-blue-950 rounded-md p-2 text-white" onClick={save}>
                        Submit
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default GuestsDialog;