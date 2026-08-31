import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import StructuredData from "@/components/StructuredData";
import { getLocalizedMetadata } from "@/lib/seo";

export const metadata: Metadata = getLocalizedMetadata("id");

export default function HomePage() {
  return (
    <>
      <StructuredData locale="id" />
      <HomeClient />
    </>
  );
}
