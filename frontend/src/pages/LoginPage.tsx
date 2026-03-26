import LoginForm from "../components/LoginForm";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Tenex Log Analyzer</h1>
      <p>Please log in to continue.</p>
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </div>
  );
}