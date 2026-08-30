import type { Metadata } from "next";
import LocalizedHome from "@/components/LocalizedHome";
import { getLocalizedMetadata } from "@/lib/seo";

export const metadata: Metadata = getLocalizedMetadata("ja");

export default function JapaneseHomePage() {
  return <LocalizedHome locale="ja" />;
}
