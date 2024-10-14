"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { FC } from "react";
import {BookingQueries} from "@/constants/Booking";

interface GuestEditorBtnProps {
    label: string;
    description: string;
    name: string;
    value: number | null;
    onChange: (value: Partial<BookingQueries>) => void;
}

const GuestEditorBtn: FC<GuestEditorBtnProps> = ({ label, description, name, value, onChange }) => {
    const increment = () => {
        if (value) {
            onChange({ [name]: value + 1 });
        } else if (!value) {
            const initValue = 0;
            onChange({ [name]: initValue + 1 });
        }
    };

    const decrement = () => {
        if (value && value > 0) {
            onChange({ [name]: value - 1 })
        }
    };

    return (
        <div className="w-full flex justify-between">
            <div className="flex flex-col gap-1">
                <h1 className="font-semibold text-blue-950">{label}</h1>
                <p className="text-sm">{description}</p>
            </div>
            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    type="button"
                    className="border-blue-950 p-2 rounded-full w-8 h-8"
                    disabled={name === "totalAdults" && value === 1}
                    onClick={decrement}
                >
                    <Minus />
                </Button>
                <h1>{!value ? 0 : value}</h1>
                <Button
                    variant="outline"
                    type="button"
                    className="border-blue-950 p-2 rounded-full w-8 h-8"
                    onClick={increment}
                >
                    <Plus />
                </Button>
            </div>
        </div>
    );
};

export default GuestEditorBtn;