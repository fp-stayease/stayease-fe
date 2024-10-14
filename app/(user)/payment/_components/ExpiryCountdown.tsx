"use client";

import {useState, useEffect, FC} from 'react';

interface ExpiryCountdownProps {
    expirationDate: string;
}

const ExpiryCountdown: FC<ExpiryCountdownProps> = ({ expirationDate }) => {
    const [timeLeft, setTimeLeft] = useState<{
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(expirationDate) - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft(null);
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [expirationDate]);

    if (!timeLeft) {
        return <div className="text-red-600 font-bold">Payment Expired</div>;
    }

    return (
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="font-semibold mb-2 text-red-600">Payment Expires In:</h2>
            <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white p-2 rounded">
                    <span className="font-bold text-red-600">{timeLeft.hours}</span>
                    <p className="text-sm text-gray-600">Hours</p>
                </div>
                <div className="bg-white p-2 rounded">
                    <span className="font-bold text-red-600">{timeLeft.minutes}</span>
                    <p className="text-sm text-gray-600">Minutes</p>
                </div>
                <div className="bg-white p-2 rounded">
                    <span className="font-bold text-red-600">{timeLeft.seconds}</span>
                    <p className="text-sm text-gray-600">Seconds</p>
                </div>
            </div>
        </div>
    );
};

export default ExpiryCountdown;