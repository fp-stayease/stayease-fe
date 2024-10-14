import BookingTable from "@/app/dashboard/booking-request/_components/BookingTable";

export const dynamic = "force-dynamic";

const BookingRequestPage = () => {
    return (
        <div className="w-full flex flex-col gap-5">
            <h1 className="text-blue-950 font-bold text-2xl">User Booking Orders</h1>
            <BookingTable />
        </div>
    );
};

export default BookingRequestPage;