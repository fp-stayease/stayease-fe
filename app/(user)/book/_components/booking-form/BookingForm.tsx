"use client";

import * as yup from "yup";
import { Form, Formik, FormikValues } from "formik";
import { Button } from "@/components/ui/button";
import { whiteSpaceRegex } from "@/constants/WhiteSpaceRegex";
import { useRouter } from "next/navigation";
import { useBookingValues } from "@/hooks/transactions/useBookingValues";
import {FC} from "react";
import { calculateDaysBetweenDates } from "@/utils/datesDifference";
import { transactionService } from "@/services/transactionService";
import {priceCalculator} from "@/utils/priceCalculator";
import {useBookingPropertyInfo} from "@/hooks/transactions/useBookingPropertyInfo";
import UserStayingDataForm from "@/app/(user)/book/_components/booking-form/stay-info/UserStayingDataForm";
import SpecialRequest from "@/app/(user)/book/_components/booking-form/special-request/SpecialRequest";
import PaymentMethodForm from "@/app/(user)/book/_components/booking-form/payment-method/PaymentMethodForm";
import CancellationPolicy from "@/app/(user)/book/_components/booking-form/CancellationPolicy";

interface BookingFormProps {
    checkInDate: string;
    checkOutDate: string;
    roomId: number;
    propertyId: number;
}

const BookingForm: FC<BookingFormProps> = ({checkInDate, checkOutDate, roomId, propertyId}) => {
    const router = useRouter();

    const {bookingValues} = useBookingValues();
    const {roomPrice, isAvailable, isLoading, error} =
        useBookingPropertyInfo(propertyId, new Date(checkInDate), new Date(checkOutDate), roomId);

    if (isLoading && !roomPrice) return <>Loading...</>
    if (error) return <>Something went wrong, please try again</>
    if (!isAvailable) return <>Room not available for the selected date</>

    const daysDiff = calculateDaysBetweenDates(checkInDate, checkOutDate);
    console.log(roomPrice);

    const bookingSchema = yup.object().shape({
        checkInTime: yup.date().nullable(),
        checkOutTime: yup.date().nullable(),
        nonSmokingRoom: yup.boolean(),
        other: yup
            .string()
            .min(3, "Please enter valid request")
            .matches(whiteSpaceRegex, "Please enter valid request")
            .nullable(),
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
                extendingUntil: null,
            };
            const bookingRequest = {
                checkInTime: value?.checkInTime,
                checkOutTime: value?.checkOutTime,
                nonSmoking: value?.nonSmokingRoom,
                other: value?.other,
            };

            const expiryTimeInfo = {
                order_time: new Date(),
                expiry_duration: 30,
                unit: "minute",
            };

            const valueToSent = {
                booking: {
                    bookingItem,
                    bookingRequest,
                    checkInDate: checkInDate,
                    checkOutDate: checkOutDate,
                    totalAdults: bookingValues.totalAdults,
                    totalChildren: bookingValues?.totalChildren,
                    totalInfants: bookingValues?.totalInfants,
                },
                amount: priceCalculator(roomPrice!, daysDiff),
                paymentMethod: value.paymentMethod,
                bank: value?.bank,
                custom_expiry: expiryTimeInfo,
            };

            const data = await transactionService.newReservation(
                valueToSent,
                bookingValues.roomId!,
            );

            router.push(
                value.paymentMethod == "manual_transfer"
                    ? `/payment?id=${data.bookingId}&bank=atm`
                    : `/payment?id=${data.bookingId}&bank=${value?.bank}`,
            );
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
                {() => (
                    <Form className="w-full flex flex-col gap-5">
                        <UserStayingDataForm />
                        <SpecialRequest />
                        <PaymentMethodForm />
                        <CancellationPolicy />
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