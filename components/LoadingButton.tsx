import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoadingButtonProps {
  title: string;
  className?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ title, className }) => {
  return (
    <Button disabled className={className ? className : `w-full`}>
      <Loader2 className="mr-2 h-4 animate-spin" />
      {title}
    </Button>
  );
};

export default LoadingButton;
