export function formatTimestamp(timestamp: string | null): string {
  if (!timestamp) return "N/A";

  const date = new Date(timestamp);

  return date.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatTimeOnly(timestamp: string): string {
  const date = new Date(timestamp);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}