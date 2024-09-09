import axiosInterceptor from "@/utils/axiosInterceptor";
import {config} from "@/constants/url";

export const tenantApproveTrx = async (token: string, bookingId: string) => {
    try {
        const { data } = await axiosInterceptor.patch(`${config.endpoints.transactions.tenant}/${bookingId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const tenantRejectTrx = async (token: string, bookingId: string) => {
    try {
        const { data } = await axiosInterceptor.put(`${config.endpoints.transactions.tenant}/${bookingId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};