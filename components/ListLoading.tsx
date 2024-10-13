import {Loader2} from "lucide-react";

const ListLoading = () => {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-blue-950 animate-spin"/>
                <p className="text-blue-950">Loading...</p>
            </div>
        </div>
    );
};

export default ListLoading;