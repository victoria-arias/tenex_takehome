import type { Anomaly } from "../types/apiTypes";

interface AnomaliesTableProps {
  anomalies: Anomaly[];
}

export default function AnomaliesTable({ anomalies }: AnomaliesTableProps) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h2>Anomalies</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Timestamp</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>IP</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Reason</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {anomalies.map((anomaly, index) => (
            <tr key={`${anomaly.ip}-${index}`}>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                {anomaly.timestamp ?? "N/A"}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{anomaly.ip}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{anomaly.reason}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{anomaly.confidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}