import type { Metadata } from "next";
import GuideClient from "@/components/GuideClient";
import StructuredData from "@/components/StructuredData";
import { getGuideMetadata } from "@/lib/seo";

export const metadata: Metadata = getGuideMetadata("en");

export default function EnglishGuidePage() {
  return (
    <>
      <StructuredData locale="en" page="guide" />
      <GuideClient />
    </>
  );
}
