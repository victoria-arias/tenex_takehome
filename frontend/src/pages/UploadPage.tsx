import FileUpload from "../components/FileUpload";
import type { UploadResponse } from "../types/apiTypes";

interface UploadPageProps {
  onUploadSuccess: (result: UploadResponse) => void;
}

export default function UploadPage({ onUploadSuccess }: UploadPageProps) {
  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Upload Log File</h1>
      <p>Select a .log or .txt file to analyze.</p>
      <FileUpload onUploadSuccess={onUploadSuccess} />
    </div>
  );
}