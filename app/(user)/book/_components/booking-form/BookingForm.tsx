"use client";

import * as yup from "yup";
import { Form, Formik, FormikValues } from "formik";
import { Button } from "@/components/ui/button";
import { whiteSpaceRegex } from "@/constants/WhiteSpaceRegex";
import { useRouter } from "next/navigation";
import { useBookingValues } from "@/hooks/transactions/useBookingValues";
import {FC, useState} from "react";
import { calculateDaysBetweenDates } from "@/utils/datesDifference";
import { transactionService } from "@/services/transactionService";
import {priceCalculator} from "@/utils/priceCalculator";
import {useBookingPropertyInfo} from "@/hooks/transactions/useBookingPropertyInfo";
import UserStayingDataForm from "@/app/(user)/book/_components/booking-form/stay-info/UserStayingDataForm";
import SpecialRequest from "@/app/(user)/book/_components/booking-form/special-request/SpecialRequest";
import PaymentMethodForm from "@/app/(user)/book/_components/booking-form/payment-method/PaymentMethodForm";
import CancellationPolicy from "@/app/(user)/book/_components/booking-form/CancellationPolicy";
import ListLoading from "@/components/ListLoading";
import {useQueryClient} from "@tanstack/react-query";
import {Loader2} from "lucide-react";
import {format} from "date-fns";
import {useAlert} from "@/context/AlertContext";

interface BookingFormProps {
    checkInDate: string;
    checkOutDate: string;
    roomId: number;
    propertyId: number;
}

const BookingForm: FC<BookingFormProps> = ({checkInDate, checkOutDate, roomId, propertyId}) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState<boolean>(false);
    const { showAlert } = useAlert();

    const now = new Date();

    const {bookingValues} = useBookingValues();
    const {roomPrice, isAvailable, isLoading, error} =
        useBookingPropertyInfo(propertyId, new Date(checkInDate), new Date(checkOutDate), roomId);

    if (isLoading && !roomPrice) return <ListLoading />
    if (error) return <>Something went wrong, please try again</>
    if (!isAvailable) return <>We are very sorry. Room not available for the selected date</>

    const daysDiff = calculateDaysBetweenDates(checkInDate, checkOutDate);

    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

    const bookingSchema = yup.object().shape({
        checkInTime: yup.string().matches(timeRegex, "Invalid time format. Use HH:mm").nullable(),
        checkOutTime: yup.string().matches(timeRegex, "Invalid time format. Use HH:mm").nullable(),
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
        setLoading(true);
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
                order_time: format(now, "yyyy-MM-dd HH:mm:ss xxxx"),
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

            router.push(`/payment?id=${data.bookingId}`);
            await queryClient.invalidateQueries({queryKey: ['get-user-bookings', 'get-payment-info', 'get-tenant-bookings']});
        } catch (error) {
            showAlert("error", "Something went wrong, please try again");
        } finally {
            setLoading(false);
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
                            disabled={loading}
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />} Pay and Continue
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BookingForm;