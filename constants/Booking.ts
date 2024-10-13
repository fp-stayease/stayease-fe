import {TenantType, UserType} from "@/constants/Users";
import {PaymentType} from "@/constants/Payment";
import {PropertyType, RoomType} from "@/constants/Property";

export type BookingValueType = {
    checkInDate: string | null;
    checkOutDate: string | null;
    totalAdults: number | null;
    totalChildren: number | null;
    totalInfants: number | null;
};

export type BookingQueries = {
    [key: string]: any;
    checkInDate: string | null;
    checkOutDate: string | null;
    totalAdults: number | null;
    totalChildren: number | null;
    totalInfants: number | null;
    roomId: number | null;
    propertyId: number | null;
};

export type BookingType = {
    booking: BookingValueType;
    setCheckInDate(newDate: string): void;
    setCheckOutDate(newDate: string): void;
    setTotalAdults(adults: number): void;
    setTotalChildren(children: number): void;
    setTotalInfants(infants: number): void;
    setCheckInTime(newTime: string): void;
    setCheckOutTime(newTime: string): void;
    setNonSmokingRoom(nonSmokingRoom: boolean): void;
    setOther(other: string): void;
    setPaymentMethod(paymentMethod: string): void;
    setBank(bank: string): void;
};

export type BookingItemsDataType = {
    isExtending: boolean | null;
    room: RoomType;
}

export type BookingRequestType = {
    checkInTime: string | null;
    checkOutTime: string | null;
    nonSmoking: boolean | null;
    other: string | null;
}

export type BookingDataType = {
    id: string;
    user: UserType;
    tenant: TenantType;
    property: PropertyType;
    totalPrice: number;
    status: string;
    bookingItems: BookingItemsDataType[];
    bookingRequest: BookingRequestType;
    payment: PaymentType;
    createdAt: string;
    checkInDate: string;
    checkOutDate: string;
    totalAdults: number;
    totalChildren: number | null;
    totalInfants: number | null;
};

export type UserBookingsType = {
    page: number;
    size: number;
    direction: string | null;
    search: string | null;
};

export const rejectedBookings = ["EXPIRED", "CANCELLED", "FAILED"];
export const pendingBookings = ["IN_PROGRESS", "WAITING_FOR_CONFIRMATION", "PENDING"];