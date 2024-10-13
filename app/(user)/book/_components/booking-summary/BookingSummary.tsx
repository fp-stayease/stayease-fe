import PropertyInfo from "@/app/(user)/book/_components/booking-summary/PropertyInfo";
import PriceDetail from "@/app/(user)/book/_components/booking-summary/PriceDetail";
import { FC } from "react";

interface BookingSummaryProps {
    propertyId: number;
    roomId: number;
    checkInDate: string;
    checkOutDate: string;
}

const BookingSummary: FC<BookingSummaryProps> = ({ propertyId, roomId, checkInDate, checkOutDate }) => {
    return (
        <div className="w-full flex flex-col gap-3 p-6 border border-gray-200 rounded-md">
            <PropertyInfo key={`property-info-${propertyId}-${roomId}`} propertyId={propertyId} roomId={roomId} />
            <PriceDetail propertyId={propertyId} roomId={roomId} checkInDate={checkInDate} checkOutDate={checkOutDate} />
        </div>
    );
};

export default BookingSummary;