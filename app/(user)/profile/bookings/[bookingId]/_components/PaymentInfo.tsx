"use client";

import {FC} from "react";
import {usePaymentInfo} from "@/hooks/usePaymentInfo";
import TransferInfo from "@/app/(user)/profile/bookings/[bookingId]/_components/TransferInfo";

interface PaymentInfoProps {
    bookingId: string;
}

const PaymentInfo: FC<PaymentInfoProps> = ({ bookingId }) => {
    const { paymentInfo, isLoading, error } = usePaymentInfo(bookingId);
    return (
        <div className="w-full flex flex-col gap-3">
            <div className="w-full bg-blue-500 bg-opacity-20 rounded-md p-2">
                <h1>Payment</h1>
            </div>
            { isLoading && <>Loading...</> }
            { error && <>Oops... Something went wrong</> }
            { paymentInfo?.paymentMethod && <TransferInfo payment={paymentInfo} bookingId={bookingId} /> }
        </div>
    );
};

export default PaymentInfo;