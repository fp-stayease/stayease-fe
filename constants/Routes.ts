import {
  BadgePercent,
  BookOpenText,
  Calendar,
  ChartLine,
  LayoutGrid,
  LibraryBig,
  LucideIcon,
  Settings,
  Sofa,
  Star,
  User,
} from "lucide-react";

export type RouteType = {
  label: string;
  href: string;
};

export const routes: RouteType[] = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export type SidebarRoutesType = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const adminRoutes: SidebarRoutesType[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Property", href: "/dashboard/properties", icon: Sofa },
  {
    label: "Room Availability",
    href: "/dashboard/room-availability",
    icon: Calendar,
  },
  {
    label: "Booking Request",
    href: "/dashboard/booking-request",
    icon: LibraryBig,
  },
  {
    label: "Rates Management",
    href: "/dashboard/rates",
    icon: BadgePercent,
  },
  { label: "Reviews", href: "/dashboard/reviews", icon: Star },
  { label: "Reports", href: "/dashboard/reports", icon: ChartLine },
];

export const userMenuRoutes: SidebarRoutesType[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "My Profile", href: "/profile", icon: User },
  { label: "My Bookings", href: "/profile/bookings", icon: BookOpenText },
  { label: "My Reviews", href: "/profile/reviews", icon: Star },
  { label: "Settings", href: "/profile/settings", icon: Settings },
];

export const footerNavigationItems = [
  { label: "NAVIGATION", href: "/about" },
  { label: "SERVICES", href: "/faq" },
  { label: "RESOURCES", href: "/properties" },
];

export const footerServicesItems = [
  { label: "Video Chat", href: "" },
  { label: "Housing Guide", href: "/" },
  { label: "Terms & Conditions", href: "/" },
  { label: "Privacy Policy", href: "/" },
];
