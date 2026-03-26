import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import UploadPage from "./pages/UploadPage";
import ResultsPage from "./pages/ResultsPage";
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

  return <ResultsPage result={result} onBack={() => setResult(null)} />;
}