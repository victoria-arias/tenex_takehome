import type { TimelineEvent } from "../types/apiTypes";
import { formatTimestamp } from "../utils/format";

interface TimelineTableProps {
  timeline: TimelineEvent[];
}

export default function TimelineTable({ timeline }: TimelineTableProps) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h2>Timeline</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Timestamp</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px" }}>Event</th>
          </tr>
        </thead>
        <tbody>
          {timeline.map((item, index) => (
            <tr key={`${item.timestamp}-${index}`}>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{formatTimestamp(item.timestamp)}</td>
              <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{item.event}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}