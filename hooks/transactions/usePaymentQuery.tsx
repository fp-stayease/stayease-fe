"use client";

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

type PaymentQueryType = {
    id: string | null;
}

export const usePaymentQuery = () => {
    const searchParams = useSearchParams();
    const [paymentQuery, setPaymentQuery] = useState<PaymentQueryType>({
        id: null
    });

    useEffect(() => {
        const query = new URLSearchParams(searchParams);
        const id = query.get("id");
        
        setPaymentQuery(prev => ({
            ...prev,
            id: id
        }))
    }, [searchParams]);

    return paymentQuery;
}