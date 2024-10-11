import FormikCheckbox from "@/components/formik/FormikCheckBox";
import FormikInput from "@/components/formik/FormikInput";
import TimePicker from "@/app/(user)/book/_components/booking-form/special-request/TimePicker";

const SpecialRequest = () => {
    return (
        <div className="w-full flex flex-col gap-5 border-b border-gray-200 pb-5">
            <div className="w-full flex flex-col gap-1">
                <h1 className="text-blue-950">Let us know if you have any request</h1>
                <p className="text-xs text-blue-950 opacity-70">
                    You will know the availability of your additional request when you check-in. Extra charges may incur but you can still cancel your request later
                </p>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-8">
                <TimePicker name={"checkInTime"} label={"Check In"} />
                <TimePicker name={"checkOutTime"} label={"Check Out"} />
                <FormikCheckbox name={"nonSmokingRoom"} label={"Non-smoking room"} />
                <FormikInput name={"other"} label={"Other"} />
            </div>
        </div>
    );
};

export default SpecialRequest;