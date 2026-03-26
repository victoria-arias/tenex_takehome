import type { TopIP } from "../types/apiTypes";

interface TopIPsTableProps {
  topIPs: TopIP[];
}

export default function TopIPsTable({ topIPs }: TopIPsTableProps) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h2>Top IPs</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>IP</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Count</th>
          </tr>
        </thead>
        <tbody>
          {topIPs.map((item) => (
            <tr key={item.ip}>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{item.ip}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}