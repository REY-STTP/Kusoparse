import type { Metadata } from "next";
import LocalizedGuide from "@/components/LocalizedGuide";
import { getGuideMetadata } from "@/lib/seo";

export const metadata: Metadata = getGuideMetadata("en");

export default function EnglishGuidePage() {
  return <LocalizedGuide locale="en" />;
}
