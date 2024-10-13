import {BookingType} from "@/constants/Booking";

export type PaymentType = {
    id: number;
    amount: number;
    paymentMethod: string;
    paymentStatus: string;
    paymentProof: string | null;
    bankVa: string | null;
    bank: string;
    paymentExpirationAt: string;
};