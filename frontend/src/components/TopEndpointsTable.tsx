import type { TopEndpoint } from "../types/apiTypes";

interface TopEndpointsTableProps {
  topEndpoints: TopEndpoint[];
}

export default function TopEndpointsTable({ topEndpoints }: TopEndpointsTableProps) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h2>Top Endpoints</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Endpoint</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Count</th>
          </tr>
        </thead>
        <tbody>
          {topEndpoints.map((item) => (
            <tr key={item.endpoint}>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{item.endpoint}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}