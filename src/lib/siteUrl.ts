export function getAppUrl(path = "") {
  // Use current origin for OAuth redirects in development
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    const baseUrl = window.location.origin;
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseUrl}${normalizedPath}`;
  }
  
  // Use production URL for certificate verification links
  const productionUrl = "https://lernexai.site";
  const baseUrl = import.meta.env.VITE_SITE_URL || import.meta.env.VITE_APP_URL || productionUrl;
  const normalizedBase = baseUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}
