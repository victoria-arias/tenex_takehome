# 📊 Tenex Log Analyzer – Full-Stack Cybersecurity Application

This project is a full-stack web application that allows users to upload log files, analyze traffic patterns, and detect potential anomalies. It was developed as part of a take-home assessment for a data science role at Tenex AI.

The application focuses on transforming raw log data into clear, human-readable insights that would be useful for a Security Operations Center (SOC) analyst.

---

## 🚀 Features

### Core Functionality

- Basic authentication (login system)
- Upload `.log` or `.txt` files
- Backend parsing into structured data (pandas DataFrame)
- Request rate visualization over time (line chart)

### Summary Statistics

- Total requests
- Unique IPs
- Error count

### Analysis Outputs

- Top IPs and endpoints
- Timeline of events

### Anomaly Detection

The application detects:

- High total request volume from a single IP
- Burst traffic within short time windows
- Repeated failed login attempts
- Access to sensitive endpoints (e.g., `/admin`, `/.env`)

Anomalies are:
- Merged per IP to avoid duplication
- Explained with clear reasoning
- Assigned a confidence score

---

## 🧠 Approach

The system follows a simple pipeline:
Log File → Parser → DataFrame → Analyzer → Anomaly Detector → Frontend Visualization


### Backend
- Parses logs into structured tabular format using pandas
- Computes summary metrics and time-based aggregations
- Applies rule-based anomaly detection

### Frontend
- Built with React + TypeScript
- Displays results in tables and charts
- Emphasizes clarity and usability

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Recharts

### Backend
- Python
- Flask
- pandas

---

## 📦 Project Structure

```
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
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```
git clone https://github.com/victoria-arias/tenex_takehome.git
cd tenex_takehome
```

### 2. Start the backend
```
cd backend
python app.py
```

Backend runs at: http://127.0.0.1:5001/


### 3. Start the frontend

Open a new terminal:
```
cd frontend
npm install
npm run dev
```

### 4. Login
- Username: admin
- Password: Tenex2026


### 5. Upload a log file

Upload a `.log` or `.txt` file and view results on the dashboard.

---

## 📊 Example Output

The results page includes:

- Summary metrics displayed as cards
- Request rate over time (line chart)
- Top IPs and endpoints
- Timeline of events
- Detected anomalies

If no anomalies are found:
No suspicious activity detected in the analyzed log data.


---

## 🤖 Anomaly Detection Design

The anomaly detection system is intentionally simple and interpretable.

Each rule captures a different behavioral signal:

- Aggregate anomalies (total request volume)
- Temporal anomalies (burst traffic)
- Authentication anomalies (failed logins)
- Access anomalies (sensitive endpoints)

To improve readability:
- Multiple triggers for the same IP are merged
- Reasons are combined into a single explanation
- Confidence reflects the strongest detected signal

---

## 📈 Design Decisions

- Used pandas for flexible log analysis and aggregation
- Chose rule-based detection for interpretability
- Prioritized frontend clarity over visual complexity
- Used synthetic log data to demonstrate time-based patterns

---

## 🔮 Future Improvements

- Replace rule-based detection with ML-based anomaly detection
- Add filtering and search in the UI
- Improve authentication (JWT/session-based)
- Deploy to cloud (e.g., Vercel + GCP)
- Add real-time streaming log analysis

---

## 🎥 Demo

A short walkthrough video demonstrates:
- Login flow
- File upload
- Analysis dashboard
- Anomaly detection behavior

---

## 🙌 Notes

This project prioritizes:
- Clear data interpretation
- Simple, maintainable design
- Strong end-to-end functionality over production-level complexity.