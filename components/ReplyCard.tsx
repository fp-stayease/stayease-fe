import {ReplyType} from "@/constants/Replies";
import {FC} from "react";
import {dateFormater} from "@/utils/dateFormatter";

interface ReplyCardProps {
    reply: ReplyType;
}

const ReplyCard: FC<ReplyCardProps> = ({reply}) => {
    return (
        <div className="w-full grid grid-cols-1 p-4 border gap-y-2 border-gray-200 rounded-md bg-white">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1 text-sm">
                    <h1 className="font-semibold">{reply.tenant.businessName}</h1>
                    <p className="text-gray-500">{dateFormater(reply.createdAt)}</p>
                </div>
            </div>
            <div className="w-full">
                <p>
                    {reply.reply}
                </p>
            </div>
        </div>
    );
};

export default ReplyCard;