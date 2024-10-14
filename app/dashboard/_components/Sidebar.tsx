import logo from "@/public/stayease-logo.webp";
import Image from "next/image";
import SidebarRoutes from "@/app/dashboard/_components/SidebarRoutes";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 fixed hidden lg:flex flex-col px-6 py-10 gap-2 bg-white h-screen border-r border-gray-200 z-50">
      <Link href="/">
        <div className="w-full flex justify-center">
          <Image src={logo} alt="logo" height={35} priority />
        </div>
      </Link>
      <SidebarRoutes />
    </div>
  );
};

export default Sidebar;
