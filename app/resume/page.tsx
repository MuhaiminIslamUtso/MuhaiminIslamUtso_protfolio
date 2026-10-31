import type { Metadata } from "next";
import MainLayout from "@/app/components/layout/MainLayout";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Download the resume/CV of Muhaimin Islam Utso.",
};

export default function ResumePage() {
  return (
    <MainLayout>
      <ResumeClient />
    </MainLayout>
  );
}

