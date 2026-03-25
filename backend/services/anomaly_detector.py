# apply simple and interpretable security rules
def detect_anomalies(df):

    if df.empty:
        return []

    anomalies = []

    # Rule 1: high request volume
    ip_counts = df["ip"].value_counts()

    for ip, count in ip_counts.items():
        if count > 20:
            anomalies.append({
                "timestamp": None,
                "ip": ip,
                "reason": "Unusual number of requests from a single IP",
                "confidence": round(min(count / 50, 1.0), 2),
            })

    # Rule 2: sensitive endpoints
    sensitive = {"/admin", "/login", "/.env", "/config"}

    sensitive_hits = df[df["endpoint"].isin(sensitive)]

    for _, row in sensitive_hits.iterrows():
        anomalies.append({
            "timestamp": row["timestamp"].isoformat(),
            "ip": row["ip"],
            "reason": f"Sensitive endpoint accessed: {row['endpoint']}",
            "confidence": 0.75
        })

    # Rule 3: failed login bursts
    failed = df[
        (df["endpoint"] == "/login") &
        (df["status_code"] == 401)
    ]

    failed_counts = failed["ip"].value_counts()

    for ip, count in failed_counts.items():
        if count >= 3:
            anomalies.append({
                "timestamp": None,
                "ip": ip,
                "reason": f"Repeated failed login attempts ({count})",
                "confidence": round(min(0.5 + count / 10, 1.0), 2)
            })

    return anomalies