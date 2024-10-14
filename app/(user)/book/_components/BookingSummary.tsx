import PropertyInfo from "@/app/(user)/book/_components/PropertyInfo";
import PriceDetail from "@/app/(user)/book/_components/PriceDetail";


const BookingSummary = () => {
    return (
        <div className="w-full flex flex-col gap-3 p-6 border border-gray-200 rounded-md">
            <PropertyInfo />
            <PriceDetail />
        </div>
    );
};

export default BookingSummary;