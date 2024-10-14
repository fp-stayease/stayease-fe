import axiosInterceptor from "@/utils/axiosInterceptor";
import {config} from "@/constants/url";
import {ReviewsInputType, ReviewsParamsType, ReviewType} from "@/constants/Review";

export const reviewService = {
    getUserReviews: async (query?: Partial<ReviewsParamsType>) => {
        try {
            const { data } = await axiosInterceptor.get(config.endpoints.reviews.userReviews, {
                params: query
            });
            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getTenantReviews: async (query?: Partial<ReviewsParamsType>) => {
        try {
            const { data } = await axiosInterceptor.get(config.endpoints.reviews.tenantReviews, {
                params: query
            });
            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getPropertyReviews: async (propertyId: number, query?: Partial<ReviewsParamsType>) => {
        try {
            const { data } = await axiosInterceptor.get(config.endpoints.reviews.propertyReviews + propertyId, {
                params: query
            });
            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getPropertyRating: async (propertyId: number) => {
        try {
            const { data } = await axiosInterceptor.get(config.endpoints.reviews.propertyRating + propertyId);
            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    createUserReview: async (reviewId: number, value: any) => {
        try {
            const { data } = await axiosInterceptor.post(config.endpoints.reviews.postUserReviews + reviewId, value);
            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getAllReviews: async (): Promise<ReviewType[]> => {
        try {
            const {data} = await axiosInterceptor.get(config.endpoints.reviews.allReviews);
            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    updateUserReview: async (reviewId: number, value: ReviewsInputType) => {
        try {
            const { data } = await axiosInterceptor.put(config.endpoints.reviews.updateUserReviews + reviewId, value);
            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    deleteUserReview: async (reviewId: number) => {
        try {
            const { data } = await axiosInterceptor.delete(config.endpoints.reviews.deleteUserReviews + reviewId);
            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getReviewDetail: async (reviewId: number) => {
        try {
            const { data } = await axiosInterceptor.get(config.endpoints.reviews.reviewDetail + reviewId);
            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}