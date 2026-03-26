import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import UploadPage from "./pages/UploadPage";
import type { UploadResponse } from "./types/apiTypes";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [result, setResult] = useState<UploadResponse | null>(null);

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  if (!result) {
    return <UploadPage onUploadSuccess={setResult} />;
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Upload successful</h1>
      <p>File: {result.filename}</p>
      <p>Total requests: {result.analysis.summary.total_requests}</p>
      <p>Anomalies detected: {result.anomalies.length}</p>
      <p>Next step: build the full results page.</p>

      <button onClick={() => setResult(null)} style={{ marginTop: "16px" }}>
        Upload Another File
      </button>
    </div>
  );
}