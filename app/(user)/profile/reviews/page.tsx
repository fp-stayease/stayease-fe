import ReviewList from "@/app/(user)/profile/reviews/_components/ReviewList";

export const dynamic = "force-dynamic";

const UserReviewPage = () => {
    return (
        <div className="w-full flex flex-col gap-5">
            <h1 className="text-lg text-blue-950 font-semibold">My Reviews</h1>
            <ReviewList />
        </div>
    );
};

export default UserReviewPage;