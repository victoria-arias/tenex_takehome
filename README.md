📊 Tenex Log Analyzer – Full-Stack Cybersecurity Application

This project is a full-stack web application that allows users to upload log files, analyze traffic patterns, and detect potential anomalies. It was developed as part of a take-home assessment for a data science role at Tenex AI.

The application focuses on transforming raw log data into clear, human-readable insights that would be useful for a Security Operations Center (SOC) analyst.

🚀 Features
Core Functionality
🔐 Basic authentication (login system)
📁 Upload .log or .txt files
⚙️ Backend parsing into structured data (pandas DataFrame)
📈 Request rate visualization over time (line chart)
📋 Summary statistics:
Total requests
Unique IPs
Error count
🌐 Top IPs and endpoints
🕒 Timeline of events
Anomaly Detection

The application detects and highlights:

High total request volume from a single IP
Burst traffic within short time windows
Repeated failed login attempts
Access to sensitive endpoints (e.g., /admin, /.env)

Anomalies are:

merged per IP to avoid duplication
explained with clear reasoning
assigned a confidence score
🧠 Approach

The system follows a simple pipeline:

Log File → Parser → DataFrame → Analyzer → Anomaly Detector → Frontend Visualization
Backend
Parses logs into structured tabular format using pandas
Computes summary metrics and time-based aggregations
Applies rule-based anomaly detection
Frontend
Built with React + TypeScript
Displays results in tables and charts
Emphasizes clarity and usability
🏗️ Tech Stack
Frontend
React (Vite)
TypeScript
Recharts (for visualization)
Backend
Python
Flask
pandas
📦 Project Structure
tenex_assignment/
├── backend/
│   ├── routes/
│   ├── services/
│   ├── app.py
│   └── config.py
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   ├── types/
│   │   └── utils/
│   └── package.json
⚙️ Setup Instructions
1. Clone the repository
git clone <your-repo-url>
cd tenex_assignment
2. Start the backend
cd backend
python app.py

The backend will run at:

http://127.0.0.1:5001
3. Start the frontend

Open a new terminal:

cd frontend
npm install
npm run dev

The frontend will run at:

http://localhost:5173
4. Login

Use the demo credentials:

Username: admin
Password: tenex123
5. Upload a log file
Upload a .log or .txt file
View results immediately on the dashboard

Example log files are included in the repository.

📊 Example Output

The results page includes:

Summary metrics displayed as cards
Request rate over time (line chart)
Tables for:
Top IPs
Top endpoints
Timeline of events
Detected anomalies

If no anomalies are found, the UI clearly indicates:

No suspicious activity detected in the analyzed log data.
🤖 Anomaly Detection Design

The anomaly detection system is intentionally simple and interpretable.

Each rule captures a different behavioral signal:

Aggregate anomalies (total request volume)
Temporal anomalies (burst traffic)
Authentication anomalies (failed logins)
Access anomalies (sensitive endpoints)

To improve readability:

multiple triggers for the same IP are merged
reasons are combined into a single explanation
confidence reflects the strongest detected signal
📈 Design Decisions
Used pandas for flexible log analysis and aggregation
Chose rule-based detection for interpretability
Prioritized frontend clarity over visual complexity
Used synthetic log data to demonstrate time-based patterns
🔮 Future Improvements
Replace rule-based detection with ML-based anomaly detection
Add filtering and search in the UI
Improve authentication (JWT/session-based)
Deploy to cloud (e.g., Vercel + GCP)
Add real-time streaming log analysis
🎥 Demo

A short walkthrough video is included demonstrating:

login flow
file upload
analysis dashboard
anomaly detection behavior
🙌 Notes

This project prioritizes:

clear data interpretation
simple, maintainable design
strong end-to-end functionality

over production-level complexity.