import BookingDetailView from "@/components/BookingDetailView";
import {notFound} from "next/navigation";

const BookingDetailPage = ({ params }: { params: { bookingId: string } }) => {
    if (!params.bookingId) {
        notFound();
    }
    return <BookingDetailView bookingId={params.bookingId} />;
};

export default BookingDetailPage;