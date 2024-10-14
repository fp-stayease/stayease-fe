"use client";

import Lottie from "react-lottie";
import animationData from "@/assets/lotties/lottie-loading.json";

const Loading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <div className="w-full h-full flex justify-center items-center bg-white opacity-50">
            <Lottie options={defaultOptions} />
        </div>
    );
};

export default Loading;