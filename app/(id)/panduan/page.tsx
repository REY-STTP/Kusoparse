import type { Metadata } from "next";
import GuideClient from "@/components/GuideClient";
import StructuredData from "@/components/StructuredData";
import { getGuideMetadata } from "@/lib/seo";

export const metadata: Metadata = getGuideMetadata("id");

export default function GuidePage() {
  return (
    <>
      <StructuredData locale="id" page="guide" />
      <GuideClient />
    </>
  );
}
