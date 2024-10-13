import {useBookingValues} from "@/hooks/transactions/useBookingValues";
import GuestsDialog from "@/app/(user)/book/_components/booking-form/stay-info/GuestDialog";

const GuestInfo = () => {
    const { bookingValues } = useBookingValues();
    const totalGuests = (bookingValues.totalAdults || 1) + (bookingValues.totalChildren || 0) + (bookingValues.totalInfants || 0);

    return (
        <div className="w-full flex flex-col gap-2">
            <h1 className="text-blue-950 text-sm">Guests</h1>
            <div className="w-full flex justify-between">
                <p>{totalGuests} { totalGuests > 1 ? "Guests" : "Guest" }</p>
                <GuestsDialog />
            </div>
        </div>
    );
};

export default GuestInfo;