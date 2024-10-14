import React from 'react';
import PaymentSelection from "@/app/(user)/book/_components/PaymentSelection";

const PaymentMethodForm = () => {
    return (
        <div className="w-full flex flex-col gap-5 border-b border-gray-200 pb-5">
            <h1 className="text-blue-950">Payment Method</h1>
            <PaymentSelection />
        </div>
    );
};

export default PaymentMethodForm;