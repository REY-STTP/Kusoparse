import { notFound } from "next/navigation";

// Catch-all for unmatched top-level paths so they render the branded
// Indonesian (default locale) 404 inside the (id) root layout.
export default function NotFoundCatchAll() {
  notFound();
}
