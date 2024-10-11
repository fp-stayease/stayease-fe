"use client";

import * as yup from "yup";
import {whiteSpaceRegex} from "@/constants/WhiteSpaceRegex";
import {Dispatch, FC, SetStateAction} from "react";
import {Form, Formik, FormikValues} from "formik";
import FormikInput from "@/components/FormikInput";
import {Button} from "@/components/ui/button";
import {useQueryClient} from "@tanstack/react-query";
import {ReplyInputType} from "@/constants/Replies";
import {replyService} from "@/services/ReplyService";

interface EditReplyStateProps {
    reply: string;
    replyId: number;
    setEditState: Dispatch<SetStateAction<boolean>>;
}

const EditReplyState: FC<EditReplyStateProps> = ({reply, replyId, setEditState}) => {
    const queryClient = useQueryClient();
    const updateReplySchema = yup.object().shape({
        comment: yup.string().min(3, "Min. 3 characters").matches(whiteSpaceRegex, "Please enter valid reply"),
    });

    const initialValue = {
        comment: reply
    };

    const handleUpdateReply = async (value: FormikValues) => {
        try {
            const replyValue = value as ReplyInputType;
            await replyService.updateReply(replyId, replyValue);
            await queryClient.invalidateQueries({queryKey: ["get-review-replies"]});
            setEditState(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Formik
            initialValues={initialValue}
            validationSchema={updateReplySchema}
            onSubmit={async (values) => {
                await handleUpdateReply(values);
            }}
        >
            {() => (
                <Form className="w-full flex flex-col gap-1">
                    <FormikInput
                        name="comment"
                        placeholder="Enter your reply"
                        className="border rounded-md p-2"
                        as="textarea"
                    />
                    <Button
                        type="submit"
                        className="bg-blue-950 w-max"
                    >
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default EditReplyState;