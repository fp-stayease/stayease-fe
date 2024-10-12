"use client";
import React, { useState } from "react";
import { FormType, UserType } from "@/constants/Types";
import Image from "next/image";
import logo from "@/public/stayease-logo.webp";
import { Button } from "@/components/ui/button";
import googleLogo from "@/assets/icons/google-icon.png";
import AuthForm from "@/app/(auth)/_components/AuthForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getInitialValues } from "@/utils/authInitialValues";
import { useGoogleLogin } from "@/hooks/auth/useGoogleLogin";
import GlobalLoading from "@/components/GlobalLoading";
import BackToHomeButton from "@/app/(auth)/_components/BackToHomeButton";

interface AuthCardProps {
  formType: FormType;
}

const AuthCard: React.FC<AuthCardProps> = ({ formType }) => {
  const [userType, setUserType] = useState<UserType>("USER");
  const { googleLogin, isLoading, error } = useGoogleLogin();
  const router = useRouter();
  const initialValues = getInitialValues(formType);

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    e.preventDefault();
    router.push(path);
  };

  if (isLoading) return <GlobalLoading fullPage />;

  return (
    <div className="w-96 max-sm:w-80 max-sm:px-5 flex flex-col items-center bg-white px-7 py-10 gap-5 md:gap-7">
      <div className="w-full flex flex-col items-center md:gap-3 gap-2 md:mb-5">
        <Image src={logo} alt="logo" height={50} className="mb-10" priority />
        <h1 className="text-3xl font-bold text-blue-950 md:text-left">
          {formType === "login"
            ? "Login"
            : formType === "register"
              ? "Register"
              : "Reset Password"}
        </h1>
        {formType === "register" && (
          <>
            <p>Choose account type:</p>
            <p>
              <span
                className={
                  userType === "USER"
                    ? "font-bold p-1 bg-blue-950 text-white rounded-sm cursor-pointer"
                    : "font-normal cursor-pointer"
                }
                onClick={() => setUserType("USER")}
              >
                <a>User</a>
              </span>{" "}
              /{" "}
              <span
                className={
                  userType === "TENANT"
                    ? "font-bold p-1 bg-blue-950 text-white rounded-sm cursor-pointer"
                    : "font-normal cursor-pointer"
                }
                onClick={() => setUserType("TENANT")}
              >
                <a>Tenant</a>
              </span>
            </p>
          </>
        )}
      </div>
      <AuthForm
        formType={formType}
        initialValues={initialValues}
        userType={userType}
      />
      <div className="w-full relative mt-2">
        <hr className="bg-neutral-500 w-full relative" />
        <h1
          className="absolute right-1/2 translate-x-1/2 -translate-y-1/2 bg-white
                    text-neutral-500 text-sm"
        >
          OR
        </h1>
      </div>
      <Button
        variant="outline"
        className="w-full flex items-center gap-2"
        onClick={googleLogin}
      >
        <Image src={googleLogo} alt={"google"} height={20} />
        Continue with Google
      </Button>
      <div className="flex items-center gap-1">
        <p className="text-sm text-gray-600">
          {formType === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>
        <Link
          href="#"
          className="text-sm font-bold text-blue-950 hover:underline"
          onClick={(e) =>
            handleNavigation(e, formType === "login" ? "/register" : "/login")
          }
        >
          {formType === "login" ? "Register" : "Login"}
        </Link>
      </div>
      <BackToHomeButton />
    </div>
  );
};

export default AuthCard;
