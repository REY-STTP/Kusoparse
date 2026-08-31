import { notFound } from "next/navigation";

// Catch-all for unmatched /en/* paths so they render the English 404
// inside the (en) root layout.
export default function NotFoundCatchAll() {
  notFound();
}
