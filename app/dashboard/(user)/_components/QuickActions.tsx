import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface QuickActionsProps {
  className?: string;
  actions: { icon: LucideIcon; label: string; href: string }[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ className, actions }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-blue-950">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action, index) => {
          const { icon: Icon } = action; // Destructure the icon and use as a component
          return index === 0 ? (
            <Button
              key={index}
              className="w-full flex items-center justify-center bg-blue-950 hover:bg-gray-200 text-appgray hover:text-blue-950"
              asChild
            >
              <Link href={action.href}>
                <Icon className="mr-2" />
                {action.label}
              </Link>
            </Button>
          ) : (
            <Button
              key={index}
              className="w-full flex items-center justify-center"
              variant="outline"
              asChild
            >
              <Link href={action.href}>
                <Icon className="mr-2" />
                {action.label}
              </Link>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
