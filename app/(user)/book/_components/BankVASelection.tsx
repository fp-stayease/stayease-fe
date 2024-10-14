import BankOption from "@/app/(user)/book/_components/BankOption";
import {banks} from "@/constants/Banks";

const BankVaSelection = () => {
    return (
        <div className="w-full flex flex-col gap-2">
            <h1 className="text-sm text-blue-950">Select Bank</h1>
            {
                banks.map((bank, i) => (
                    <BankOption key={i} id={bank.id} label={bank.label} image={bank.image} />
                ))
            }
        </div>
    );
};

export default BankVaSelection;