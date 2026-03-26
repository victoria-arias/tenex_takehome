# apply simple and interpretable security rules
def detect_anomalies(df):
    if df.empty:
        return []

    anomalies_by_ip = {}

    def add_anomaly(ip, reason, confidence, timestamp=None):
        """
        Merge anomaly signals for the same IP into one entry.
        """
        if ip not in anomalies_by_ip:
            anomalies_by_ip[ip] = {
                "timestamp": timestamp,
                "ip": ip,
                "reasons": [reason],
                "confidence": float(confidence),
            }
        else:
            # Add new reason if it is not already present
            if reason not in anomalies_by_ip[ip]["reasons"]:
                anomalies_by_ip[ip]["reasons"].append(reason)

            # Keep highest confidence
            anomalies_by_ip[ip]["confidence"] = max(
                anomalies_by_ip[ip]["confidence"],
                float(confidence)
            )

            # Prefer a real timestamp over None
            if anomalies_by_ip[ip]["timestamp"] is None and timestamp is not None:
                anomalies_by_ip[ip]["timestamp"] = timestamp

    # Rule 1: high total request volume from a single IP
    ip_counts = df["ip"].value_counts()
    for ip, count in ip_counts.items():
        count = int(count)
        if count > 20:
            add_anomaly(
                ip=ip,
                reason="Unusual total number of requests from this IP",
                confidence=round(min(count / 50, 1.0), 2),
                timestamp=None,
            )

    # Rule 2: sensitive endpoint access
    sensitive_endpoints = {"/admin", "/.env", "/config"}
    sensitive_hits = df[df["endpoint"].isin(sensitive_endpoints)]

    for _, row in sensitive_hits.iterrows():
        add_anomaly(
            ip=row["ip"],
            reason=f"Sensitive endpoint accessed ({row['endpoint']})",
            confidence=0.75,
            timestamp=row["timestamp"].isoformat(),
        )

    # Rule 3: repeated failed login attempts
    failed_logins = df[
        (df["endpoint"] == "/login") &
        (df["status_code"] == 401)
    ]

    failed_counts = failed_logins["ip"].value_counts()
    for ip, count in failed_counts.items():
        count = int(count)
        if count >= 3:
            add_anomaly(
                ip=ip,
                reason=f"Repeated failed login attempts ({count})",
                confidence=round(min(0.5 + count / 10, 1.0), 2),
                timestamp=None,
            )

    # Rule 4: burst traffic per IP per minute
    burst_df = (
        df.set_index("timestamp")
        .groupby("ip")
        .resample("1min")
        .size()
        .reset_index(name="request_count")
    )

    burst_hits = burst_df[burst_df["request_count"] > 10]

    for _, row in burst_hits.iterrows():
        request_count = int(row["request_count"])
        add_anomaly(
            ip=row["ip"],
            reason=f"Burst traffic detected ({request_count} requests in one minute)",
            confidence=round(min(request_count / 20, 1.0), 2),
            timestamp=row["timestamp"].isoformat(),
        )

    # Convert merged structure into final frontend-friendly list
    merged_anomalies = []
    for anomaly in anomalies_by_ip.values():
        merged_anomalies.append({
            "timestamp": anomaly["timestamp"],
            "ip": anomaly["ip"],
            "reason": "; ".join(anomaly["reasons"]),
            "confidence": float(round(anomaly["confidence"], 2)),
        })

    # Optional: sort by confidence descending
    merged_anomalies.sort(key=lambda x: x["confidence"], reverse=True)

    return merged_anomalies