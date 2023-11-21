export const hasSubdomain = (hostname: string) => {
  // Count the number of dots in the hostname
  const dotCount = (hostname.match(/\./g) || []).length;

  // Check if there are more than two dots
  return dotCount > 1;
};

export const isLocalhost = (hostname: string) => {
  return hostname.includes("localhost");
};
