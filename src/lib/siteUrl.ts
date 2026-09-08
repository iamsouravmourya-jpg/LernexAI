export function getAppUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // In browser, always use current origin so redirects remain on the active host/domain
  if (typeof window !== "undefined" && window.location.origin) {
    return `${window.location.origin}${normalizedPath}`;
  }
  
  // Server-side / fallback: Use production URL or configured site URL
  const productionUrl = "https://lernexai.site";
  const baseUrl = (
    import.meta.env.VITE_SITE_URL ||
    import.meta.env.VITE_APP_URL ||
    (typeof process !== "undefined" ? process.env.VITE_SITE_URL || process.env.SITE_URL : "") ||
    productionUrl
  );
  const normalizedBase = baseUrl.replace(/\/$/, "");
  return `${normalizedBase}${normalizedPath}`;
}
