"use client";

import {usePreviousURL} from "@/hooks/utils/usePreviousUrl";
import {useRouter} from "next/navigation";
import Image from "next/image";
import successImage from "@/assets/images/payment-success.png";
import Link from "next/link";

const SuccessfulPaymentPageView = () => {
    const {getPreviousURL} = usePreviousURL();
    const router = useRouter();

    const prevUrl = getPreviousURL();

    if (!prevUrl || !prevUrl?.includes("payment")) {
        router.push("/")
    }

    return (
        <div className="w-full h-screen -mt-28 flex flex-col items-center justify-center gap-5">
            <h1 className="text-2xl md:text-4xl font-bold">Payment Success</h1>
            <Image src={successImage} alt={"image"} className="w-96 object-contain"/>
            <p>Go to <Link href="/profile/bookings" className="underline font-semibold">My Orders</Link></p>
        </div>
    );
};

export default SuccessfulPaymentPageView;