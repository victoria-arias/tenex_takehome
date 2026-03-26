import { useState } from "react";
import { uploadLogFile } from "../api/client";
import type { UploadResponse } from "../types/apiTypes";

interface FileUploadProps {
  onUploadSuccess: (result: UploadResponse) => void;
}

export default function FileUpload({ onUploadSuccess }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await uploadLogFile(selectedFile);
      onUploadSuccess(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Upload failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input
        type="file"
        accept=".log,.txt"
        onChange={(event) => {
          const file = event.target.files?.[0] || null;
          setSelectedFile(file);
        }}
      />

      <div style={{ marginTop: "16px" }}>
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload and Analyze"}
        </button>
      </div>

      {selectedFile && (
        <p style={{ marginTop: "12px" }}>
          Selected file: {selectedFile.name}
        </p>
      )}

      {error && (
        <p style={{ color: "red", marginTop: "12px" }}>
          {error}
        </p>
      )}
    </div>
  );
}