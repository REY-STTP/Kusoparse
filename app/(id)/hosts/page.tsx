import type { Metadata } from "next";
import HostsContent from "@/components/HostsContent";
import StructuredData from "@/components/StructuredData";
import { getHostsMetadata } from "@/lib/seo";

export const metadata: Metadata = getHostsMetadata("id");

export default function HostsPage() {
  return (
    <>
      <StructuredData locale="id" page="hosts" />
      <HostsContent locale="id" />
    </>
  );
}
