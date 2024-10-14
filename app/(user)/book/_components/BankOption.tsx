"use client";

import Image, {StaticImageData} from "next/image";
import FormikInput from "@/components/formik/FormikInput";
import {FC} from "react";

interface BankOptionProps {
    id: string;
    label: string;
    image: StaticImageData;
}

const BankOption: FC<BankOptionProps> = ({ id, label, image }) => {
    return (
        <label htmlFor={id} className="w-full py-2 px-4 flex items-center gap-2 border border-gray-200 rounded-md">
            <FormikInput name={"bank"} label={label} id={id} type="radio" value={id} />
            <h1>{ label }</h1>
            <Image src={image} alt={id} height={20} className="ml-auto" />
        </label>
    );
};

export default BankOption;