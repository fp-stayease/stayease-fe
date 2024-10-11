"use client";

import * as yup from "yup";
import {whiteSpaceRegex} from "@/constants/WhiteSpaceRegex";
import {Form, Formik, FormikValues} from "formik";
import FormikInput from "@/components/FormikInput";
import {Button} from "@/components/ui/button";
import {replyService} from "@/services/ReplyService";
import {ReplyInputType} from "@/constants/Replies";
import {FC, ForwardRefExoticComponent, RefAttributes} from "react";
import {DialogCloseProps} from "@radix-ui/react-dialog";
import {useQueryClient} from "@tanstack/react-query";

interface ReplyFormProps {
    DialogClose: ForwardRefExoticComponent<DialogCloseProps & RefAttributes<HTMLButtonElement>>
    reviewId: number;
}

const ReplyForm: FC<ReplyFormProps> = ({DialogClose, reviewId}) => {
    const queryClient = useQueryClient();
    const replySchema = yup.object().shape({
        comment: yup.string().min(3, "Min. 3 characters").matches(whiteSpaceRegex, "Please enter valid reply").required(),
    });

    const handleReply = async (value: FormikValues) => {
        try {
            const replyValue = value as ReplyInputType;
            await replyService.adminReplyReview(replyValue, reviewId);
            await queryClient.invalidateQueries({queryKey: ["get-review-replies"]});
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Formik
            validationSchema={replySchema}
            initialValues={{comment: null}}
            onSubmit={async (values) => {
                await handleReply(values);
            }}
        >
            {() => (
                <Form className="w-full flex flex-col gap-2">
                    <FormikInput
                        as="textarea"
                        name="comment"
                        placeholder="Enter your reply"
                        className="p-3 border rounded-md"
                    />
                    <div className="w-full flex justify-end">
                        <div className="w-max flex items-center gap-4">
                            <DialogClose asChild>
                                <Button
                                    variant="link"
                                    className="p-0"
                                    type="button"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button
                                    className="bg-blue-950 text-white"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </DialogClose>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default ReplyForm;