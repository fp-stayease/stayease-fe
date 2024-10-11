import {ReplyType} from "@/constants/Replies";
import {FC, useState} from "react";
import {dateFormater} from "@/utils/dateFormatter";
import {Button} from "@/components/ui/button";
import {Pencil, Trash2} from "lucide-react";
import EditReplyState from "@/app/dashboard/reviews/_components/EditReplyState";
import DeleteReplyDialog from "@/app/dashboard/reviews/_components/DeleteReplyDialog";

interface ReplyCardProps {
    reply: ReplyType;
}

const TenantReplyCard: FC<ReplyCardProps> = ({reply}) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    return (
        <div className="w-full grid grid-cols-1 p-4 border gap-y-2 border-gray-200 rounded-md bg-white">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1 text-sm">
                    <h1 className="font-semibold">{reply.tenant.businessName}</h1>
                    <p className="text-gray-500">{dateFormater(reply.createdAt)}</p>
                </div>
                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        className="p-2"
                        onClick={() => setIsEdit(prev => !prev)}
                    >
                        <Pencil className="w-4 h-4 text-blue-950" />
                    </Button>
                    <DeleteReplyDialog replyId={reply.id} />
                </div>
            </div>
            <div className="w-full">
                {
                    isEdit ?
                        <EditReplyState reply={reply.reply} replyId={reply.id} setEditState={setIsEdit}/> :
                        <p>
                            {reply.reply}
                        </p>
                }
            </div>
        </div>
    );
};

export default TenantReplyCard;