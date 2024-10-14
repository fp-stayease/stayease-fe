import React from 'react';

const CancellationPolicy = () => {
    return (
        <div className="w-full flex flex-col gap-5 border-b border-gray-200 pb-5">
            <h1 className="text-blue-950">Cancellation Policy</h1>
            <p className="text-xs text-blue-950">
                <span className="font-bold">Free cancellation</span> before D+3 from booking. After that, there will be only <span className="font-bold">partial refund</span>
            </p>
        </div>
    );
};

export default CancellationPolicy;