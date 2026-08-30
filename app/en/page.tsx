import type { Metadata } from "next";
import LocalizedHome from "@/components/LocalizedHome";
import { getLocalizedMetadata } from "@/lib/seo";

export const metadata: Metadata = getLocalizedMetadata("en");

export default function EnglishHomePage() {
  return <LocalizedHome locale="en" />;
}
