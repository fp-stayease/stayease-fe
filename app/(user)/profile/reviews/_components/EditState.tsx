"use client";

import * as yup from "yup";
import {FC, useState} from "react";
import {whiteSpaceRegex} from "@/constants/WhiteSpaceRegex";
import {Form, Formik, FormikValues} from "formik";
import {Button} from "@/components/ui/button";
import StarInput from "@/components/formik/StarInput";
import FormikInput from "@/components/formik/FormikInput";
import {reviewService} from "@/services/reviewService";
import {Loader2} from "lucide-react";

interface EditStateProps {
    rating?: number  | undefined | null;
    comment?: string | undefined | null;
    reviewId: number;
}

const EditState: FC<EditStateProps> = ({ rating, comment, reviewId }) => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const reviewSchema = yup.object().shape({
        rating: yup.number().min(1, "Unable to give rating below 1").max(5, "Unable to give rating above 5").required("Rating required"),
        comment: yup.string().min(3, "Min 3 characters").matches(whiteSpaceRegex, "Please enter valid review").required(),
    });

    const initialValue = {
        rating: rating || 0,
        comment: comment || "",
    }

    const handleEditReview = async (value: FormikValues) => {
        setLoading(true);
        try {
            const response = await reviewService.createUserReview(reviewId, value);
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Formik
            initialValues={initialValue}
            validationSchema={reviewSchema}
            onSubmit={async (value) => {
                await handleEditReview(value);
            }}
        >
            {
                () => (
                    <Form className="w-full grid grid-cols-1 gap-y-2">
                        <StarInput />
                        <FormikInput className="w-full" name="comment" label="How's your stay?" />
                        <Button
                            variant="link"
                            type="submit"
                            className="w-max p-0"
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="w-4 h-4 text-blue-950 animate-spin" />} Submit
                        </Button>
                    </Form>
                )
            }
        </Formik>
    );
};

export default EditState;