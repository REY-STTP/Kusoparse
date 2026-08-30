import type { Metadata } from "next";
import LocalizedGuide from "@/components/LocalizedGuide";
import { getGuideMetadata } from "@/lib/seo";

export const metadata: Metadata = getGuideMetadata("ja");

export default function JapaneseGuidePage() {
  return <LocalizedGuide locale="ja" />;
}
