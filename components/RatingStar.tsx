import { FC } from "react";

interface RatingStarProps {
    rating: number | null | undefined;
}

const RatingStar: FC<RatingStarProps> = ({ rating }) => {
    return (
        <div className="w-full flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
                <span
                    key={i}
                    style={{
                        color: rating &&i < rating ? "#ffc107" : "#e4e5e9"
                    }}
                    className='cursor-pointer text-2xl'
                >
                    &#9733;
                </span>
            ))}
        </div>
    );
};

export default RatingStar;