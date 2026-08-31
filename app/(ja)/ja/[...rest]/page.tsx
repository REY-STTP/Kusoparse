import { notFound } from "next/navigation";

// Catch-all for unmatched /ja/* paths so they render the Japanese 404
// inside the (ja) root layout.
export default function NotFoundCatchAll() {
  notFound();
}
