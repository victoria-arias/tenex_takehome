import type { RequestRatePoint } from "../types/apiTypes";

interface RequestRateTableProps {
  points: RequestRatePoint[];
}

export default function RequestRateTable({ points }: RequestRateTableProps) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h2>Request Rate Over Time</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Timestamp</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Requests</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point, index) => (
            <tr key={`${point.timestamp}-${index}`}>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{point.timestamp}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{point.request_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}