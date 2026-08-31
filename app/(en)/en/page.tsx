import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import StructuredData from "@/components/StructuredData";
import { getLocalizedMetadata } from "@/lib/seo";

export const metadata: Metadata = getLocalizedMetadata("en");

export default function EnglishHomePage() {
  return (
    <>
      <StructuredData locale="en" />
      <HomeClient />
    </>
  );
}
