import { loginUser } from "./api/client";

export default function App() {
  async function testLogin() {
    try {
      const result = await loginUser("admin", "Tenex2026");
      console.log("Login success:", result);
      alert("Login worked");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Tenex Log Analyzer</h1>
      <button onClick={testLogin}>Test Login API</button>
    </div>
  );
}
