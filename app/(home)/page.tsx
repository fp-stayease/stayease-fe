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
