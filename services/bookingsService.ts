import {config} from "@/constants/url";
import {BookingDataType, UserBookingsType} from "@/constants/Booking";
import axiosInterceptor from "@/utils/axiosInterceptor";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export const bookingsService = {
    getTenantBookings: async () => {
        try {
            const { data } = await axiosInterceptor.get(config.endpoints.bookings.tenantBookings);
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getUserBookings: async (query?: Partial<UserBookingsType>) => {
        try {
            const { data } = await axiosInterceptor.get(config.endpoints.bookings.userBookings, {
                params: query,
            });
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getBookingDetail: async (id: string): Promise<BookingDataType> => {
        try {
            const { data } = await axiosInterceptor.get(config.endpoints.bookings.bookingDetail + id);
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getUpcomingBookings: async (): Promise<BookingDataType[]> => {
        try {
            const {data} = await axiosInterceptor.get(config.endpoints.bookings.upcomingBookings);
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};
