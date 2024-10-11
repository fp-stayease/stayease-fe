import {RoomAvailabilityType} from "@/constants/Property";
import axiosInterceptor from "@/utils/axiosInterceptor";
import {config} from "@/constants/url";
import {
    DailySalesType,
    MonthlySalesType,
    OverviewSummaryTypes,
    PopularRoomType, PropertySalesType,
    ReportsQueryType, UserOverviewStatsType
} from "@/constants/Reports";
import {BookingDataType} from "@/constants/Booking";

export const reportService = {
    getRoomAvailability: async (): Promise<RoomAvailabilityType[]> => {
        try {
            const {data} = await axiosInterceptor.get(config.endpoints.reports.availabilityReports);
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getOverviewSummary: async (): Promise<OverviewSummaryTypes> => {
        try {
            const {data} = await axiosInterceptor.get(config.endpoints.reports.overviewReports);
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getMonthlySales: async (): Promise<MonthlySalesType[]> => {
        try {
            const {data} = await axiosInterceptor.get(config.endpoints.reports.monthlySales);
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getRecentTrx: async (): Promise<BookingDataType[]> => {
        try {
            const {data} = await axiosInterceptor.get(config.endpoints.reports.recentTrx);
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getPopularRoom: async (): Promise<PopularRoomType[]> => {
        try {
            const {data} = await axiosInterceptor.get(config.endpoints.reports.popularRooms);
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getDailySales: async (query?: Partial<ReportsQueryType>): Promise<DailySalesType[]> => {
        try {
            const {data} = await axiosInterceptor.get(config.endpoints.reports.dailySales, {
                params: query
            });
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getPropertiesSales: async (query?: Partial<ReportsQueryType>): Promise<PropertySalesType> => {
        try {
            const {data} = await axiosInterceptor.get(config.endpoints.reports.propertySales, {
                params: query
            });
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getUserStats: async (): Promise<UserOverviewStatsType> => {
        try {
            const {data} = await axiosInterceptor.get(config.endpoints.reports.userStats);
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getTenantRatings: async (): Promise<number> => {
        try {
            const {data}  = await axiosInterceptor.get(config.endpoints.reports.tenantRatings);
            return data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}