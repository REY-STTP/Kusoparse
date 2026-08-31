import type { Metadata } from "next";
import HostsContent from "@/components/HostsContent";
import StructuredData from "@/components/StructuredData";
import { getHostsMetadata } from "@/lib/seo";

export const metadata: Metadata = getHostsMetadata("en");

export default function EnglishHostsPage() {
  return (
    <>
      <StructuredData locale="en" page="hosts" />
      <HostsContent locale="en" />
    </>
  );
}
