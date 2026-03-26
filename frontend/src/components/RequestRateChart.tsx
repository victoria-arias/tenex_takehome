import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { RequestRatePoint } from "../types/apiTypes";

interface RequestRateTableProps {
  points: RequestRatePoint[];
}

function formatXAxisLabel(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTooltipLabel(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export default function RequestRateTable({ points }: RequestRateTableProps) {
  return (
    <div className="section">
      <h2>Request Rate Over Time</h2>

      {points.length === 0 ? (
        <p className="info-text">No request-rate data available.</p>
      ) : (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={points} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatXAxisLabel}
                minTickGap={30}
              />
              <YAxis allowDecimals={false} />
              <Tooltip
                labelFormatter={(label) => formatTooltipLabel(String(label))}
                formatter={(value) => [value, "Requests"]}
              />
              <Line
                type="monotone"
                dataKey="request_count"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}