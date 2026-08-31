import type { Metadata } from "next";
import HostsContent from "@/components/HostsContent";
import StructuredData from "@/components/StructuredData";
import { getHostsMetadata } from "@/lib/seo";

export const metadata: Metadata = getHostsMetadata("ja");

export default function JapaneseHostsPage() {
  return (
    <>
      <StructuredData locale="ja" page="hosts" />
      <HostsContent locale="ja" />
    </>
  );
}
