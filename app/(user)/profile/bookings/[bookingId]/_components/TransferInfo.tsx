"use client";

import UploadProofDialog from "@/components/UploadProofDialog";
import {PaymentType} from "@/constants/Payment";
import {FC} from "react";
import {usePathname} from "next/navigation";

interface ManualTransferInfoProps {
    payment: PaymentType;
    bookingId: string;
}

const TransferInfo: FC<ManualTransferInfoProps> = ({ payment, bookingId }) => {
    const pathname = usePathname();
    let paymentMethodName;
    const paymentTime = new Date(payment?.paymentExpirationAt).toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });
    if (payment?.paymentMethod === "manual_transfer") {
        paymentMethodName = "ATM/Manual Transfer";
    } else {
        paymentMethodName = "Bank VA";
    }

    if (payment?.paymentStatus === "PENDING" && payment?.paymentMethod === "manual_transfer" && !pathname.includes("dashboard")) {
        return (
            <div className="w-full flex flex-col gap-2 text-blue-950">
                <p>Payment Type: ATM/Manual Transfer</p>
                <p>Status: Waiting for Payment</p>
                <div className="flex items-center gap-2 text-blue-950">
                    <p className="text-red-800">Expired at:</p>
                    <p className="text-red-800 font-semibold">{paymentTime}</p>
                </div>
                <div className="w-full flex flex-col gap-1 text-blue-950 text-sm">
                    <p>Bank: BCA</p>
                    <p>Account Number: 7387582758247</p>
                    <p>Account holder&apos;s name: Stay Ease Property Rental</p>
                </div>
                <UploadProofDialog bookingId={bookingId}/>
            </div>
        )
    }
    if (payment?.paymentStatus === "PENDING" && payment?.paymentMethod === "bank_transfer" && !pathname.includes("dashboard")) {
        return (
            <div className="w-full flex flex-col gap-2 text-blue-950">
                <p>Payment Type: Bank Virtual Account</p>
                <p>Status: Waiting for Payment</p>
                <div className="flex items-center gap-2 text-blue-950">
                    <p>Expired at:</p>
                    <p className="text-red-800 font-semibold">
                        {paymentTime}
                    </p>
                </div>
                <div className="w-full flex flex-col gap-1 text-blue-950 text-sm">
                    <p>Bank: {payment?.bank}</p>
                    <p>Virtual Account Number: {payment?.bankVa}</p>
                </div>
            </div>
        )
    }
    return (
        <div className="w-full flex flex-col gap-2 text-blue-950">
            <p>Payment Type: {paymentMethodName}</p>
            <p className="capitalize">Status: {payment?.paymentStatus}</p>
        </div>
    );
};

export default TransferInfo;