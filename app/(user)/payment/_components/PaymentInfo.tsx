"use client";

import { usePaymentQuery } from "@/hooks/transactions/usePaymentQuery";
import PaymentInstructions from "@/app/(user)/payment/_components/PaymentInstructions";

const PaymentInfo = () => {
    const { id } = usePaymentQuery();

    if (!id) {
        return <>Invalid request, please try again</>
    }

    return <PaymentInstructions bookingId={id!} />
};

export default PaymentInfo;