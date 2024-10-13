import React from 'react';
import FormikSelect from "@/components/formik/FormikSelect";
import {useField} from "formik";
import BankVaSelection from "@/app/(user)/book/_components/booking-form/payment-method/BankVaSelection";

const options = [
    { label: "ATM/Bank Transfer", value: "manual_transfer" },
    { label: "Bank VA", value: "bank_transfer" },
]

const PaymentSelection = () => {
    const [field] = useField("paymentMethod");
    const value = field.value;

    return (
        <div className="w-full flex flex-col gap-5">
            <FormikSelect name={"paymentMethod"} options={options} />
            {
                value === "manual_transfer" ?
                    <>Manual Transfer</> :
                    <BankVaSelection />

            }
        </div>
    );
};

export default PaymentSelection;