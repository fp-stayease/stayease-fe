const CancellationPolicy = () => {
    return (
        <div className="w-full flex flex-col gap-5 border-b border-gray-200 pb-5">
            <h1 className="text-blue-950">Cancellation Policy</h1>
            <p className="text-xs text-blue-950">
                You only can cancel the booking
                <span className="font-bold"> if you haven&apos;t paid the booking</span> or
                <span className="font-bold"> you did not pay within the payment time limit</span>
            </p>
        </div>
    );
};

export default CancellationPolicy;