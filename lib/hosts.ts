// ./lib/hosts.ts

// Hostnames that KUSOPARSE recognizes when handling links from a Kusonime
// article. lib/resolveLink.ts turns these into its allowlist sets, and the
// supported-hosts pages and llms.txt files cite them, so this module is the
// single source of truth for host coverage.

// Hosts treated as direct download destinations.
export const DIRECT_HOSTS = [
  "acefile.co",
  "drive.google.com",
  "drive.usercontent.google.com",
  "krakenfiles.com",
  "terabox.com",
  "1024terabox.com",
  "mega.nz",
  "megaup.net",
  "buzzheavier.com",
  "hxfile.co",
  "gofile.io",
  "pixeldrain.com",
] as const;

// Shortlink or paste hosts the resolver can expand automatically.
export const INTERMEDIARY_HOSTS = [
  "justpaste.it",
  "shrinkearn.com",
  "tpi.li",
] as const;

export const DIRECT_HOST_COUNT = DIRECT_HOSTS.length;
export const INTERMEDIARY_HOST_COUNT = INTERMEDIARY_HOSTS.length;
