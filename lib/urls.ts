const KUSONIME_HOSTS = new Set(["kusonime.com", "www.kusonime.com"]);

export function normalizeHttpUrl(
  value: string | null | undefined,
  base?: string | URL,
) {
  if (!value) return null;

  try {
    const baseUrl = base
      ? typeof base === "string"
        ? new URL(base)
        : base
      : undefined;
    const url = new URL(value, baseUrl);

    if (
      !["http:", "https:"].includes(url.protocol) ||
      !url.hostname ||
      url.username ||
      url.password
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

export function isKusonimeArticleUrl(value: string | URL) {
  let url: URL;

  try {
    url = typeof value === "string" ? new URL(value) : value;
  } catch {
    return false;
  }

  return (
    ["http:", "https:"].includes(url.protocol) &&
    KUSONIME_HOSTS.has(url.hostname.toLowerCase()) &&
    !url.port &&
    !url.username &&
    !url.password &&
    !url.search &&
    !url.hash &&
    /^\/[a-zA-Z0-9-]+\/?$/.test(url.pathname)
  );
}
