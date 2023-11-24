export const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null;
  if (!host && typeof window !== "undefined") {
    // On client side, get the host from window
    host = window.location.host;
  }
  if (!host?.includes("localhost") && host?.match(/\./g)?.length === 1) {
    return null;
  }

  if (host && host.includes(".")) {
    const candidate = host.split(".")[0];
    if (candidate && !candidate.includes("localhost")) {
      // Valid candidate
      subdomain = candidate;
    }
  }

  return subdomain;
};

export const getSystemName = (subdomain: string | null) => {
  return subdomain === "dev1" ? "test" : subdomain;
};
