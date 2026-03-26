import { useState } from "react";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Tenex Log Analyzer</h1>
      <p>Logged in successfully.</p>
      <p>Next step: build the upload page.</p>
    </div>
  );
}
