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
import { formatTimeOnly, formatTimestamp } from "../utils/format";

interface RequestRateTableProps {
  points: RequestRatePoint[];
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
                tickFormatter={(value) => formatTimeOnly(String(value))}
                minTickGap={30}
              />
              <YAxis allowDecimals={false} />
              <Tooltip
                labelFormatter={(value) => formatTimestamp(String(value))}
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