import type { Anomaly } from "../types/apiTypes";

interface AnomaliesTableProps {
  anomalies: Anomaly[];
}

export default function AnomaliesTable({ anomalies }: AnomaliesTableProps) {
  return (
    <div className="section">
      <h2>Anomalies</h2>

      {anomalies.length === 0 ? (
        <p className="info-text">
          No suspicious activity detected in the analyzed log data.
        </p>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>IP</th>
                <th>Reason</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {anomalies.map((anomaly, index) => (
                <tr key={`${anomaly.ip}-${index}`}>
                  <td>{anomaly.timestamp ?? "N/A"}</td>
                  <td>{anomaly.ip}</td>
                  <td>{anomaly.reason}</td>
                  <td>{anomaly.confidence.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}