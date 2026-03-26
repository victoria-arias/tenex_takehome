import type { Summary } from "../types/apiTypes";

interface SummaryCardsProps {
  summary: Summary;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <div style={{ display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
      <div style={{ border: "1px solid #ccc", padding: "16px", minWidth: "180px" }}>
        <h3>Total Requests</h3>
        <p>{summary.total_requests}</p>
      </div>

      <div style={{ border: "1px solid #ccc", padding: "16px", minWidth: "180px" }}>
        <h3>Unique IPs</h3>
        <p>{summary.unique_ips}</p>
      </div>

      <div style={{ border: "1px solid #ccc", padding: "16px", minWidth: "180px" }}>
        <h3>Error Count</h3>
        <p>{summary.error_count}</p>
      </div>
    </div>
  );
}