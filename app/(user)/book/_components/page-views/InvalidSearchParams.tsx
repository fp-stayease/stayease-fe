"use client";

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const InvalidSearchParams = () => {
    const router = useRouter();
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex flex-col gap-2">
                <h1>Invalid request params, please try again</h1>
                <Button
                    type="button"
                    className="bg-blue-950 text-white"
                    onClick={() => router.push("/")}
                >
                    Go to homepage
                </Button>
            </div>
        </div>
    );
};

export default InvalidSearchParams;