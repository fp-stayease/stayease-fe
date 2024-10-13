import React from "react";
import Image from "next/image";
import logo from "@/public/stayease-logo.webp";
import SocialIcons from "@/app/(user)/_components/footer/SocialIcons";

const FooterLogo: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Image src={logo} alt={"logo"} height={40} className="h-10" priority />
      <p className="text-xs font-light -mt-3 md:block hidden">
        Rest easy, we got you!
      </p>
      <SocialIcons className="md:block hidden" />
    </div>
  );
};

export default FooterLogo;
