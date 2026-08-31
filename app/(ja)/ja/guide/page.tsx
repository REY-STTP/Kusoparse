import type { Metadata } from "next";
import GuideClient from "@/components/GuideClient";
import StructuredData from "@/components/StructuredData";
import { getGuideMetadata } from "@/lib/seo";

export const metadata: Metadata = getGuideMetadata("ja");

export default function JapaneseGuidePage() {
  return (
    <>
      <StructuredData locale="ja" page="guide" />
      <GuideClient />
    </>
  );
}
