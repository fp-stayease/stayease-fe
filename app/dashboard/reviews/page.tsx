import React from 'react';
import TenantReviewList from "@/app/dashboard/reviews/_components/TenantReviewList";

const AdminReviewsPage = () => {
    return (
        <div className="w-full flex flex-col gap-5">
            <h1 className="text-blue-950 font-bold text-2xl">Reviews</h1>
            <TenantReviewList />
        </div>
    );
};

export default AdminReviewsPage;