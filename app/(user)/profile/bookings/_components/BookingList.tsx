"use client";

import {Input} from "@/components/ui/input";
import DatePicker from "@/components/DatePicker";
import BookingCard from "@/app/(user)/profile/bookings/_components/BookingCard";
import {useUserBookingList} from "@/hooks/transactions/useUserBookingList";
import {useUserBookingsFilter} from "@/hooks/transactions/useUserBookingsFilter";
import {Button} from "@/components/ui/button";
import ListLoading from "@/components/ListLoading";

const BookingList = () => {
    const { queries, setQuery } = useUserBookingsFilter();
    const {
        bookings,
        isLoading,
        error,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage } = useUserBookingList(queries);

    return (
        <div className="w-full grid grid-cols-1 gap-y-4">
            <div className="w-full flex flex-col xl:flex-row md:items-start xl:items-center justify-between gap-2">
                <Input
                    placeholder="Search by property name"
                    className="w-full xl:max-w-96"
                    onChange={e => setQuery({search: e.target.value})}
                />
            </div>
            { isLoading &&  <ListLoading /> }
            { error && <>Oops... Something went wrong, failed to fetch your booking list</> }
            {
                bookings?.map((booking, i) => (
                    <BookingCard key={i} booking={booking} />
                ))
            }
            {
                hasNextPage &&
                    <Button
                        variant="outline"
                        className="border-blue-950 text-blue-950"
                        onClick={() => fetchNextPage()}
                    >
                        Load more
                    </Button>
            }
            { isFetchingNextPage && <>Loading...</> }
        </div>
    );
};

export default BookingList;