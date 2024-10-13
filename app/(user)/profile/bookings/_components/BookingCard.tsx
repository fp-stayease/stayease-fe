import Image from "next/image";
import imageEx from "@/assets/images/template_property.jpg";
import Tag from "@/components/ui/tag";
import BookingCardOption from "@/app/(user)/profile/bookings/_components/BookingCardOption";
import {FC} from 'react';
import {BookingDataType, pendingBookings, rejectedBookings} from "@/constants/Booking";
import {currencyFormatter} from "@/utils/CurrencyFormatter";
import {dateFormater} from "@/utils/dateFormatter";
import {cn} from "@/lib/utils";

interface BookingCardProps {
    booking: BookingDataType;
}

const BookingCard: FC<BookingCardProps> = ({ booking }) => {
    const status = booking.status || "";
    let color;
    if (rejectedBookings.includes(status)) {
        color = "bg-red-400 text-red-800";
    } else if (pendingBookings.includes(status)) {
        color = "bg-yellow-500 text-yellow-800";
    } else {
        color = "bg-green-400 text-green-800";
    }
    return (
        <div className="w-full flex flex-col lg:flex-row gap-3 border border-gray-200 p-5 rounded-md">
            <Image src={booking.property.imageUrl} alt={"image"} height={120} width={120} className="h-32 object-cover rounded-md"/>
            <div className="w-full flex flex-col gap-2">
                <div className="w-full flex items-center justify-between">
                    <div className="w-full flex flex-col md:flex-row lg:flex-col xl:flex-row md:items-center lg:items-start xl:items-center gap-2">
                        <p className="text-xs text-blue-950 text-opacity-50">Booking ID: { booking.id }</p>
                        <Tag className={cn("text-xs py-1 px-2 uppercase", color)}>{ booking.status.replaceAll("_", " ") }</Tag>
                    </div>
                    <BookingCardOption bookingId={booking.id} status={booking.status} paymentMethod={booking.payment.paymentMethod}/>
                </div>
                <div className="w-full flex flex-col xl:flex-row gap-3 lg:gap-1">
                    <div className="w-full xl:w-1/2 flex flex-col gap-2">
                        <h1 className="text-lg text-blue-950 font-semibold">{ booking.property.propertyName }</h1>
                        <p className="text-sm text-blue-950">{ currencyFormatter(booking.totalPrice) }</p>
                        <p className="text-sm text-blue-950 text-opacity-70">{ `${dateFormater(booking.checkInDate)} - ${dateFormater(booking.checkOutDate)}` }</p>
                    </div>
                    <div className="w-px h-full bg-gray-200 hidden lg:block"/>
                    <hr className="border-gray-200"/>
                    <div className="w-full xl:w-1/2 flex flex-col gap-2">
                        <h1>Room:</h1>
                        {
                            booking.bookingItems.map((bookingItem, i) => (
                                <p key={i}>{ bookingItem.room.name }</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;