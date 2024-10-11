"use client";
import React from "react";
import LandingPage from "@/app/(home)/_components/landing-page/LandingPage";
import PageWrapper from "@/components/PageWrapper";

export default function Home() {
  return (
    <main>
      <PageWrapper>
        <LandingPage />
      </PageWrapper>
    </main>
  );
}

// ! only for debugging, delete when done
if (typeof window === "undefined") {
  console.log("Server-side Environment Variables:");
  console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
  console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
  console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
  console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
  console.log("Server-side NEXT_PUBLIC environment check:");
  console.log("NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);
  console.log("NEXT_PUBLIC_BACKEND_URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
  console.log(
    "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:",
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  );
  console.log(
    "NEXT_PUBLIC_GOOGLE_MAPS_ID:",
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
  );
}
