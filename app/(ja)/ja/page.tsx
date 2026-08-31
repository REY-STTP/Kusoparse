import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import StructuredData from "@/components/StructuredData";
import { getLocalizedMetadata } from "@/lib/seo";

export const metadata: Metadata = getLocalizedMetadata("ja");

export default function JapaneseHomePage() {
  return (
    <>
      <StructuredData locale="ja" />
      <HomeClient />
    </>
  );
}
