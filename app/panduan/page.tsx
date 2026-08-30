import type { Metadata } from "next";
import LocalizedGuide from "@/components/LocalizedGuide";
import { getGuideMetadata } from "@/lib/seo";

export const metadata: Metadata = getGuideMetadata("id");

export default function GuidePage() {
  return <LocalizedGuide locale="id" />;
}
