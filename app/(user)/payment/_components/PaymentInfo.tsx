"use client";

import Image from "next/image";
import UploadProofDialog from "@/components/UploadProofDialog";
import {usePaymentQuery} from "@/hooks/transactions/usePaymentQuery";
import {useRouter} from "next/navigation";
import PaymentInstructions from "@/app/(user)/payment/_components/PaymentInstructions";

const PaymentInfo = () => {
    const { id } = usePaymentQuery();
    const router = useRouter();

    if (!id) return router.push("/");

    return <PaymentInstructions bookingId={id} />;
};

export default PaymentInfo;