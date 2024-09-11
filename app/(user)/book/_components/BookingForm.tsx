"use client";

import * as yup from "yup";
import UserStayingDataForm from "@/app/(user)/book/_components/UserStayingDataForm";
import SpecialRequest from "@/app/(user)/book/_components/SpecialRequest";
import PaymentMethodForm from "@/app/(user)/book/_components/PaymentMethodForm";
import CancellationPolicy from "@/app/(user)/book/_components/CancellationPolicy";
import {Form, Formik, FormikValues} from "formik";
import {Button} from "@/components/ui/button";
import {whiteSpaceRegex} from "@/constants/WhiteSpaceRegex";
import {useRouter} from "next/navigation";
import {useBookingValues} from "@/hooks/useBookingValues";
import axiosInterceptor, {authService} from "@/services/authService";
import {useEffect, useState} from "react";

const BookingForm = () => {
    const router = useRouter();
    const { bookingValues } = useBookingValues();
    const [token, setToken] = useState<string | null>();
    useEffect(() => {
        setToken(authService.getAccessToken);
    }, []);

    const bookingSchema = yup.object().shape({
        checkInTime: yup.date().nullable(),
        checkOutTime: yup.date().nullable(),
        nonSmokingRoom: yup.boolean(),
        other: yup.string().min(3, "Please enter valid request").matches(whiteSpaceRegex, "Please enter valid request").nullable(),
        paymentMethod: yup.string().required("Please select payment method"),
        bank: yup.string().nullable(),
    });

    const initialValues: FormikValues = {
        checkInTime: "",
        checkOutTime: "",
        other: "",
        nonSmokingRoom: false,
        paymentMethod: "manual_transfer",
        bank: "",
    };

    const handleBooking = async (value: FormikValues) => {
        try {
            const bookingItem = {
                extendingUntil: null
            };
            const bookingRequest = {
                checkInTime: value?.checkInTime,
                checkOutTime: value?.checkOutTime,
                nonSmoking: value?.nonSmokingRoom,
                other: value?.other,
            };

            const expiryTimeInfo = {
                order_time: new Date(),
                expiry_duration: value?.bank === "bank_transfer" ? 30 : 60,
                unit: "minute"
            }

            const valueToSent = {
                booking: {
                    bookingItem,
                    bookingRequest,
                    checkInDate: bookingValues.checkInDate,
                    checkOutDate: bookingValues.checkOutDate,
                    totalAdults: bookingValues.totalAdults,
                    totalChildren: bookingValues?.totalChildren,
                    totalInfants: bookingValues?.totalInfants,
                },
                amount: 2400000,
                paymentMethod: value.paymentMethod,
                bank: value?.bank,
                custom_expiry: expiryTimeInfo,
            };

            console.log(valueToSent);
            console.log(token);

            const { data } = await axiosInterceptor.post(`/transactions/${bookingValues.roomId}`, valueToSent, {
                headers: { Authorization: `Bearer ${token}` }
            });

            router.push(value.paymentMethod == "manual_transfer" ? `/payment?id=${data.data.bookingId}&bank=atm` : `/payment?id=${data.data.bookingId}&bank=${value?.bank}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full flex flex-col gap-3">
            <Formik
                initialValues={initialValues}
                validationSchema={bookingSchema}
                onSubmit={async (value) => {
                    await handleBooking(value);
                }}
            >
                {(formik) => (
                    <Form className="w-full flex flex-col gap-5">
                        <UserStayingDataForm/>
                        <SpecialRequest/>
                        <PaymentMethodForm/>
                        <CancellationPolicy/>
                        <Button
                            type="submit"
                            className="bg-blue-950 text-white"
                            onClick={() => console.log("Button clicked")}
                        >
                            Pay and Continue
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BookingForm;