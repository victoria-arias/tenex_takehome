import SummaryCards from "../components/SummaryCards";
import TopIPsTable from "../components/TopIPsTable";
import TopEndpointsTable from "../components/TopEndpointsTable";
import RequestRateChart from "../components/RequestRateChart";
import TimelineTable from "../components/TimelineTable";
import AnomaliesTable from "../components/AnomaliesTable";
import type { UploadResponse } from "../types/apiTypes";

interface ResultsPageProps {
  result: UploadResponse;
  onBack: () => void;
}

export default function ResultsPage({ result, onBack }: ResultsPageProps) {
  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Analysis Results</h1>

      <p>
        <strong>File:</strong> {result.filename}
      </p>

      <strong>Anomalies:</strong> {result.anomalies.length}

      {result.message && <p>{result.message}</p>}

      <SummaryCards summary={result.analysis.summary} />
      <AnomaliesTable anomalies={result.anomalies} />
      <TopIPsTable topIPs={result.analysis.top_ips} />
      <TopEndpointsTable topEndpoints={result.analysis.top_endpoints} />
      <RequestRateChart points={result.analysis.request_rate_over_time} />
      <TimelineTable timeline={result.analysis.timeline} />
      

      <button onClick={onBack} style={{ marginTop: "24px" }}>
        Upload Another File
      </button>
    </div>
  );
}